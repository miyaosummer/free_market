class ProductsController < ApplicationController

  require "payjp"

  before_action :set_product_category_parent, only: :new
  before_action :card_present, only:[:credit_new, :credit_destroy, :purchase]
  before_action :set_api_key
  before_action :set_customer, only:[:purchase]
  before_action :set_card_information, only:[:purchase]
  before_action :take_card, only:[:purchase, :pay, :credit_destroy]
  before_action :get_product, only: [:show, :destroy, :edit, :update, :credit_new, :credit_create, :credit_destroy, :purchase]
  before_action :authenticate_user!, only: :new
  before_action :set_product_category_parent, only: [:new, :create, :edit, :update]
  

  def index
    #検索ワードが存在するか否かで分岐
    if params[:keyword].present?
      @products = Product.all
      #検索文字を取得（空欄含む）
      @keyword = params[:keyword]
      #検索文字を空欄で区切ったものを変数split_keywordに代入
      split_keywords = params[:keyword].split(/[[:blank:]]+/).select(&:present?)
      #区切ったワード事に検索を行う。すべての条件を満たす商品のみ検索結果に引っかかる。
      split_keywords.each do |keyword|
        @products = @products.where("name LIKE ?", "%#{keyword}%")
      end
    else
      redirect_to root_path
    end

  end

  def new
    @product = Product.new
    @product.product_images.build
    @product_category_parents = ProductCategory.where(ancestry: nil)
  end

  def create
    @product = Product.new(product_params)
    @draft = Product.new(draft_params)
    # product_size_idが空欄の時はサイズなしと表示させる。
    if product_params[:product_size_id].blank?
      @product.product_size_id = "サイズなし"
    end
    # 出品と下書き保存で処理を分岐する
    if params[:commit] == "出品する"
      if @product.save
        redirect_to root_path
      else
        render :new
      end
    elsif params[:commit] == "下書きに保存"
      if @draft.save
        redirect_to root_path
      else
        render :new
      end
    # 開発者がデバッグできるようにelse処理はコンソールへメッセージを出力
    else
      puts "No expected submit button"
    end
  end

  def edit
    if @product.product_category.present?
      @product.product_category.root
      @category_child_array = @product.product_category.root.children
      if @product.product_category.root.indirects.present?
        @category_grandchild_array = @product.product_category.parent.children
      end
      if @product.product_size.present?
        @product_size = @product.product_size
      end
    end
    if @product.public_flag == 0 && @product.product_images[0] == nil
      @product.product_images.build
    end
  end

  def update
    unnecessary_size_array     = [14, 29, 44, 57, 63, 68, 79, 82, 150, 163, 178, 188, 210, 255, 260];

    if (product_params[:product_category_id]).present?
      #編集した商品の子カテゴリ情報を取得。ノードの深さによって孫カテゴリが存在しているかを判断する。
      if ProductCategory.find(product_params[:product_category_id]).depth == 1
        product_category_children = ProductCategory.find(product_params[:product_category_id]).ancestry
      else
        product_category_children = ProductCategory.find(product_params[:product_category_id]).parent.ancestry
      end
      #product_size_idを持っていて、サイズがないカテゴリだった場合、サイズidを削除する
      if unnecessary_size_array.include?(product_category_children) && product_params[:product_size_id].present?
        product_params[:product_size_id].chop!
      end
    end
    #削除したサイズidに"サイズなし"という文字列をいれる
    if product_params[:product_size_id].blank?
      @product.product_size_id = "サイズなし"
    end
    # 出品商品への変更と下書き保存の上書きで処理を分岐する
    if params[:commit] == "変更を適用する"
      if @product.update(product_params)
        redirect_to root_path
      else
        render :edit
      end
    elsif params[:commit] == "下書きを上書きして保存"
      if @product.update(draft_params)
        redirect_to root_path
      else
        render :edit
      end
    # 開発者がデバッグできるようにelse処理はコンソールへメッセージを出力
    else
      puts "No expected submit button"
    end
  end

  def show
  end

  # 購入確認ページ
  def purchase
    if @card.present?
      @user = current_user
      @card_brand = @card_information.brand
      case @card_brand
      when "Visa"
        @card_src = "visa.png"
      when "MasterCard"
        @card_src = "mastercard.png"
      when "JCB"
        @card_src = "JCB.png"
      when "American Express"
        @card_src = "AmericanExpress.png"
      when "Diners Club"
        @card_src = "DinersClub.png"
      when "Discover"
        @card_src = "DISCOVER.png"
      end
    end
    if current_user.destination
      @destination = Destination.find_by(user_id: current_user.id)
    end
    @@buy_product = @product
  end

  ######################## ▼ クレジットカード関連 ▼ ########################
  # users_controllerにも記述あり

  # 新規作成
  def credit_new
    if @card.present?
      redirect_to action: "credit_show"
    else
      @card = CreditCard.new
    end
  end

  # 登録
  def credit_create
    customer = Payjp::Customer.create(card: params['payjp-token'], metadata: {user_id: current_user.id})
    @card = CreditCard.new(user_id: current_user.id, customer_id: customer.id, card_id: customer.default_card)
    if @card.save
      redirect_to purchase_product_path(@product.id)
    else
      redirect_to action: "credit_new"
    end
  end

  # 削除
  def credit_destroy
    @card = CreditCard.find_by(user_id: current_user.id)
    if @card.blank?
      redirect_to action: "credit_new"
    else
      customer = Payjp::Customer.retrieve(@card.customer_id)
      customer.delete
      if @card.delete
        redirect_to purchase_product_path(@product.id), notice: "削除完了しました"
      else
        redirect_to purchase_product_path(@product.id), alert: "削除できませんでした"
      end
    end
  end
  ######################## ▲ クレジットカード関連 ▲ ########################

  # 購入
  def pay
    @card = CreditCard.find_by(user_id: current_user.id)
    @destination = Destination.find_by(user_id: current_user.id)
    if @card.present? && @destination.present?
      charge = Payjp::Charge.create(
        amount: @@buy_product.price,
        customer: Payjp::Customer.retrieve(@card.customer_id),
        currency: 'jpy'
      )
      @@buy_product.update(buyer_id: current_user.id)
      redirect_to purchased_products_path
    else
      redirect_to purchase_product_path(@@buy_product.id)
    end
  end

  def purchased
  end
  
  def destroy
    if @product.seller_id == current_user.id && @product.destroy
      redirect_to root_path
    else
      redirect_to product_path(@product)
    end
  end

  # 親カテゴリーに紐づく子カテゴリーの配列を取得
  def get_product_category_children
    @product_category_children = ProductCategory.find(params[:product_category_parent_name]).children
  end

  # 子カテゴリーに紐づく孫カテゴリーの配列を取得
  def get_product_category_grandchildren
    @product_category_grandchildren = ProductCategory.find("#{params[:product_category_child_id]}").children
  end

  # サイズの配列を取得
  def get_product_size
    @product_sizes = ProductSize.find_all_by_group "#{params[:product_size_id]}"
  end

private

  # 親カテゴリーの配列を取得
  def set_product_category_parent  
    @product_category_parents = ProductCategory.where(ancestry: nil)
  end

  def product_params
    params.require(:product).permit(
      :name,
      :description,
      :price,
      :product_category_id,
      :product_condition_id,
      :postage_way_id,
      :shipping_day_id,
      :product_brand_id,
      :product_size_id,
      :prefecture_id,
      product_images_attributes: [:image, :_destroy, :id]
    ).merge(seller_id: current_user.id).merge(public_flag: "1")
  end

  def draft_params
    params.require(:product).permit(
      :name,
      :description,
      :price,
      :product_category_id,
      :product_condition_id,
      :postage_way_id,
      :shipping_day_id,
      :product_brand_id,
      :product_size_id,
      :prefecture_id,
      product_images_attributes: [:image, :_destroy, :id]
    ).merge(seller_id: current_user.id).merge(public_flag: "0")
  end

  def card_present
    @card = CreditCard.find_by(user_id: current_user.id) if CreditCard.find_by(user_id: current_user.id).present?
  end

  def set_api_key
    Payjp.api_key = Rails.application.credentials.payjp[:PAYJP_PRIVATE_KEY]
  end

  def set_customer
    if @card.present?
      @customer = Payjp::Customer.retrieve(@card.customer_id)
    end
  end

  def set_card_information
    if @card.present?
      @card_information = @customer.cards.retrieve(@card.card_id)
    end
  end

  def take_card
    @card = CreditCard.find_by(user_id: current_user.id)
  end

  def get_product
    @product = Product.find(params[:id])
  end
end