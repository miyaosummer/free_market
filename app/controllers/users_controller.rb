class UsersController < ApplicationController
  
  def index
  end

  def show
    if user_signed_in? && current_user.id ==  params[:id].to_i
      @user = User.find(params[:id])
      @destination = @user.destination
    else
      redirect_to root_path
    end
  end
 
  def logout
  end
end
