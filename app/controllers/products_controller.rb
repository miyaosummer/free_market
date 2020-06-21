class ProductsController < ApplicationController
  before_action :authenticate_user!, only: [:new]

  def new
  end

  def show
  end
  
  def purchase
  end
end
