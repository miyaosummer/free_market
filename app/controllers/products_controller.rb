class ProductsController < ApplicationController
  require "payjp"
  before_action :set_product_category_parent, only: :new

  def new
    @product = Product.new
  end

  def show
    @product = Product.find(params[:id])
  end

  ######################## ↓↓ クレジットカード関連 ↓↓ ########################

  def credit_new
    card = CreditCard.where(user_id: current_user.id)
    if card.exists?
      redirect_to purchase_products_path(current_user.id) 
    end
  end

  # クレジットカード登録
  def credit_create
    Payjp.api_key = ENV["PAYJP_PRIVATE_KEY"]
    customer = Payjp::Customer.create(card: params['payjp-token'], metadata: {user_id: current_user.id})
    @card = CreditCard.new(user_id: current_user.id, customer_id: customer.id, card_id: customer.default_card)
    if @card.save
      redirect_to purchase_products_path(current_user.id), notice: "登録が完了しました"
    else
      redirect_to action: "credit_new", alert: "カード情報が正しくありません"
    end
  end

  # クレジットカード情報
  def credit_show
    Payjp.api_key = ENV["PAYJP_PRIVATE_KEY"]
    card = CreditCard.where(user_id: current_user.id).first
    if card.blank?
      redirect_to action: "credit_new" 
    end
    @user = current_user
    @card = CreditCard.find_by(user_id: current_user.id)
    customer = Payjp::Customer.retrieve(@card.customer_id)
    @customer_card = customer.cards.retrieve(@card.card_id)
    @card_brand = @customer_card.brand
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

  def credit_destroy
    @card = CreditCard.find_by(user_id: current_user.id)
    if @card.blank?
      redirect_to action: "credit_new"
    else
      Payjp.api_key = ENV["PAYJP_PRIVATE_KEY"]
      customer = Payjp::Customer.retrieve(@card.customer_id)
      customer.delete
      if @card.delete
        redirect_to purchase_products_path(current_user.id), notice: "削除完了しました"
      else
        redirect_to purchase_products_path(current_user.id), alert: "削除できませんでした"
      end
    end
  end
  
  ######################## ↑↑ クレジットカード関連 ↑↑ ########################

  def purchase
    # @card = CreditCard.where(user_id: current_user.id).first
    # @product = Product.find(params[:id])
    # Payjp.api_key = ENV["PAYJP_PRIVATE_KEY"]
    # charge = Payjp::Charge.create(
    #   amount: @product.price,
    #   customer: Payjp::Customer.retrieve(@card.customer_id),
    #   currency: 'jpy'
    # )
    # @product_buyer= Product.find(params[:id])
    # @product_buyer.update( buyer_id: current_user.id)
    # redirect_to purchase_products_path(current_user.id)
  end
  
  # def pay
  #   @card = CreditCard.where(user_id: current_user.id).first
  #   @product = Product.find(params[:id])
  #   Payjp.api_key = ENV["PAYJP_PRIVATE_KEY"]
  #   charge = Payjp::Charge.create(
  #     amount: @product.price,
  #     customer: Payjp::Customer.retrieve(@card.customer_id),
  #     currency: 'jpy'
  #   )
  #   @product_buyer= Product.find(params[:id])
  #   @product_buyer.update( buyer_id: current_user.id)
  #   redirect_to purchase_products_path(current_user.id)
  # end

  # 親カテゴリーに紐づく子カテゴリーの配列を取得
  def get_product_category_children
    @product_category_children = ProductCategory.find(params[:product_category_parent_name]).children
  end

  # 子カテゴリーに紐づく孫カテゴリーの配列を取得
  def get_product_category_grandchildren
    @product_category_grandchildren = ProductCategory.find("#{params[:product_category_child_id]}").children
  end

private

  # 親カテゴリーの配列を取得
  def set_product_category_parent  
    @product_category_parents = ProductCategory.where(ancestry: nil)
  end

  def product_params
    params.require(:product).permit(:name,:description,:price,:seller_id,:buyer_id,:product_category_id,:product_condition_id,:postage_way_id,:postage,:shipping_day_id,:product_brand_id,:product_size_id,:prefecture_id)
  end
end
