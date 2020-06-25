class ProductsController < ApplicationController

  def new
  end

  def show
    @product = Product.find(params[:id])
  end
  
  def purchase
  end

  private

  def product_params
    params.require(:product).permit(:name, :description, :price, :seller_id, :buyer_id, :product_category_id, 
    :product_condition_id, :postage_way_id, :postage, :shipping_day_id, :product_brand_id, :product_size_id, :prefecture_id)
  end
end