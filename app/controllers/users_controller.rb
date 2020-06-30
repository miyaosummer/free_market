class UsersController < ApplicationController
  
  require "payjp"

  def index
  end

  def show
    @user = User.find(params[:id])
    @destination = @user.destination
  end
  
  # クレジットカード登録
  def credit
    Payjp.api_key = ENV["PAYJP_PRIVATE_KEY"]
    @user = current_user
    #current_user.idでログインしているユーザーのみ登録ができるようにする
    @card = CreditCard.find_by(user_id: current_user.id)
    # ログインユーザーのクレジットカード情報からPay.jpに登録されているカスタマー情報を引き出す
    customer = Payjp::Customer.retrieve(@card.customer_id)
    # カスタマー情報からカードの情報を引き出す
    @customer_card = customer.cards.retrieve(@card.card_id)
    @card_brand = @customer_card.brand
    case @card_brand
    when "Visa"
      @card_src = "visa.png"
    when "JCB"
      @card_src = "jcb.png"
    when "MasterCard"
      @card_src = "master.png"
    when "American Express"
      @card_src = "amex.png"
    when "Diners Club"
      @card_src = "diners.png"
    when "Discover"
      @card_src = "discover.png"
    end
    #カード登録がまだならshowページへ飛ぶ
    # redirect_to action: "show" if card.exists?
  end

  # クレジットカード削除
  def credit_destroy
    @card = CreditCard.find_by(user_id: current_user.id)
    if @card.blank?
      redirect_to action: "credit"
    else
      Payjp.api_key = ENV["PAYJP_PRIVATE_KEY"]
      # ログインユーザーのクレジットカード情報からPay.jpに登録されているカスタマー情報を引き出す
      customer = Payjp::Customer.retrieve(@card.customer_id)
      customer.delete
      @card.delete
      # 削除が完了しているか判断
      if @card.credit_destroy
        redirect_to users_path(current_user.id), alert: "削除完了しました"
      else
        redirect_to credit_card_path(current_user.id), alert: "削除できませんでした"
      end
    end
  end

end
