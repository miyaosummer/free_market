class ProductsController < ApplicationController
  before_action :set_product_category_parent, only: :new
  before_action :get_product, only: [:show, :destroy, :edit, :update]

  def new
    @product = Product.new
    @product.product_images.new
  end

  def create
    @product = Product.new(product_params)
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
    ).merge(seller_id: current_user.id).merge(product_size_id: "1")
  end

  # def product_params
  #   params.require(:product).permit(:name,:description,:price,:seller_id,:buyer_id,:product_category_id,:product_condition_id,:postage_way_id,:postage,:shipping_day_id,:product_brand_id,:product_size_id,:prefecture_id,product_images_attributes: [:image]).merge(user_id: current_user.id)
  # end

  def get_product
    @product = Product.find(params[:id])
  end
end
