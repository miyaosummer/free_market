class DestinationsController < ApplicationController

  def new
    @user = User.find(params[:user_id])
    @destination = Destination.new
  end

  def create
    @user = User.find(params[:user_id])
    @destination = Destination.new(destination_params)

    if @destination.save
      redirect_to root_path
    else
      render action: :new
    end
    
  end

  def edit
    @user = User.find(params[:user_id])
    @destination = Destination.find_by(user_id: current_user.id)
  end

  def update
    @destination = Destination.update(destination_params)
    redirect_to user_path(current_user.id)
  end


  private
  def destination_params
    params.require(:destination).permit(:first_name,:last_name,:first_name_kana,:last_name_kana,:postal_code,:prefecture_id,:city,:block,:building,:phone_number).merge(user_id: current_user.id)
  end
end
