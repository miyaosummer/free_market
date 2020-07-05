class UsersController < ApplicationController
  
  def index
  end

  def show
    @user = User.find(params[:id])
    @destination = @user.destination
  end
  
end
