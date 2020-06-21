class ProductsController < ApplicationController
  before_action :authenticate_user!, only: [:new]

  def new
    @product = Product.new
    @product.images.new
  end

  def create
    Product.create(product_params)
  end

  def show
  end
  
  def purchase
  end
end

private

  def product_params
    
  end