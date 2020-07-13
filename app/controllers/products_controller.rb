class ProductsController < ApplicationController
  before_action :set_product_category_parent, only: :new
  before_action :get_product, only: [:show, :destroy]

  def index

    if params[:keyword] == "" || params[:keyword] == " " || params[:keyword] == "　"
      redirect_to root_path
    end

    @products = Product.all
    #検索文字を取得（空欄含む）
    @keyword = params[:keyword]
    #検索文字を空欄で区切ったものを取得
    split_keywords = params[:keyword].split(/[[:blank:]]+/).select(&:present?)
    #区切ったワード事に検索を行う。すべての条件を満たす商品のみ検索に引っかかる。
    split_keywords.each do |keyword|
      next if keyword.blank?
      @products = @products.where("name LIKE ?", "%#{keyword}%")
    end
    
  end

  def new
    @product = Product.new
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
    params.require(:product).permit(:name,:description,:price,:seller_id,:buyer_id,:product_category_id,:product_condition_id,:postage_way_id,:postage,:shipping_day_id,:product_brand_id,:product_size_id,:prefecture_id)
  end

  def get_product
    @product = Product.find(params[:id])
  end
end
