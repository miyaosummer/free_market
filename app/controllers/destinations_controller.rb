class DestinationsController < ApplicationController
  
  def new
    @destination = Destination.new
    # @prefecture = Destination.new
  end

  def create
    destination = Destination.create(create_params)
    redirect_to root_path
  end

  def edit
  end

  def update
  end


  private
  def create_params
    params.require(:destination).permit(:first_name,:last_name,:first_name_kana,:last_name_kana,:prefecture_id,:city,:block,:building,:phone_number).merge(user_id: current_user.id)
  end
end
