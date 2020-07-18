class DestinationsController < ApplicationController

  def new
    @user = User.find(params[:user_id])
    @destination = Destination.new
    #遷移元のコントローラー名、アクション名を取得
    @@path = Rails.application.routes.recognize_path(request.referer)
  end

  def create
    @user = User.find(params[:user_id])
    @destination = Destination.new(destination_params)
    #住所が保存できた場合、newアクションからの遷移元により遷移先を分岐させる。
    if @destination.save && @@path[:controller] == "products" && @@path[:action] == "purchase"
      redirect_to purchase_products_path
    elsif @destination.save && @@path[:controller] == "users" && @@path[:action] == "show"
      redirect_to user_path(current_user.id)
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
