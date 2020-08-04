class ProductsController < ApplicationController
  before_action :authenticate_user!, only: [:new]
  before_action :set_product_category_parent, only: [:new, :create, :edit, :update]
  before_action :get_product, only: [:show, :destroy, :edit, :update]

  def new
    @product = Product.new
    @product.product_images.build
    @product_category_parents = ProductCategory.where(ancestry: nil)
  end

  def create
    @product = Product.new(product_params)
    # product_size_idが空欄の時はサイズなしと表示させる。
    if product_params[:product_size_id].blank?
      @product.product_size_id = "サイズなし"
    end
    if @product.save
      redirect_to root_path
    else
      render :new
    end
  end

  def edit
    @product.product_category.root
    @category_child_array = @product.product_category.root.children
    if @product.product_category.root.indirects.present?
      @category_grandchild_array = @product.product_category.parent.children
    end
    if @product.product_size.present?
      @product_size = @product.product_size
    end
  end

  def update
    unnecessary_size_array     = [14, 29, 44, 57, 63, 68, 79, 82, 150, 163, 178, 188, 210, 255, 260];
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
    #削除したサイズidに"サイズなし"という文字列をいれる
    if product_params[:product_size_id].blank?
      @product.product_size_id = "サイズなし"
    end
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
