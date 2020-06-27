class ProductsController < ApplicationController
  before_action :set_product_category_parent, only: :new

  def new
    @product = Product.new
  end

  def show
    @product = Product.find(params[:id])
  end
  
  def purchase
  end

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
