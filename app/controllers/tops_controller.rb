class TopsController < ApplicationController

  before_action :set_header_category_parent, only: :index
  before_action :get_header_category_children
  before_action :get_header_category_grandchildren


  def index
    @products = Product.all
  end

  # 親カテゴリーに紐づく子カテゴリーの配列を取得
  def get_header_category_children
    @product_category_children = ProductCategory.find(params[:product_category_parent_name]).children
  end

  # 子カテゴリーに紐づく孫カテゴリーの配列を取得
  def get_header_category_grandchildren
    @product_category_grandchildren = ProductCategory.find("#{params[:product_category_child_id]}").children
  end
  

  private
  # 親カテゴリーの配列を取得
  def set_header_category_parent  
    @parents = ProductCategory.where(ancestry: nil)
  end

end
