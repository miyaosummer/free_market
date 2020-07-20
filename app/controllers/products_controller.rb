class ProductsController < ApplicationController
  before_action :authenticate_user!, only: [:new]
  before_action :set_product_category_parent, only: [:new, :create, :edit, :update]
  before_action :get_product, only: [:show, :destroy, :edit, :update]

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
    if @product.product_size_id.present?
      @product.product_size_id = ProductSize.find_by_id(product_params[:product_size_id]).name
    else
      @product.product_size_id = "サイズなし"
    end
    if @product.save
      redirect_to root_path
    else
      render :new
    end
  end

  def edit
  end

  def update
    if @product.update(product_params)
      redirect_to root_path
    else
      render :edit
    end
  end

  def show
  end
  
  def destroy
    if @product.seller_id == current_user.id && @product.destroy
       redirect_to root_path
    else
      redirect_to product_path(@product)
    end
  end

  def purchase
    if current_user.destination
      @destination = Destination.find_by(user_id: current_user.id)
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
    ).merge(seller_id: current_user.id)
  end

  def get_product
    @product = Product.find(params[:id])
  end
end
