class UsersController < ApplicationController
  
  def index
  end

  def new
    @user = User.find(current_user.id)
    @destination = Destination.new
  end

  def create
    @user = User.find(current_user.id)
    @destination = Destination.new(destination_params)

    if @destination.save
      redirect_to purchase_products_path
    else
      render action: :new
    end
    
  end

  def show
    @user = User.find(params[:id])
    @destination = @user.destination
  end

  private
  def destination_params
    params.require(:destination).permit(:first_name,:last_name,:first_name_kana,:last_name_kana,:postal_code,:prefecture_id,:city,:block,:building,:phone_number).merge(user_id: current_user.id)
  end
  
end
