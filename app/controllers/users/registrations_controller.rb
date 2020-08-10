class Users::RegistrationsController < Devise::RegistrationsController
  def new
    @user = User.new
    @destination = Destination.new
    @user.build_destination
  end

  private
  
  def destination_params
    params.require(:destination).permit(
      :first_name, :last_name, :first_name_kana, :last_name_kana, :postal_code, :prefecture_id, :city,:block, :building, :phone_number
    ).merge(user_id: current_user.id)
  end
end
