class TopsController < ApplicationController
  def index
    @products = Product.all
  end
end
