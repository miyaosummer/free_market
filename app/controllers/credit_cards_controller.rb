class CreditCardsController < ApplicationController

  require "payjp"

  def new
    #current_user.idでログインしているユーザーのみ登録ができるようにする
    card = CreditCard.where(user_id: current_user.id)
    #カード登録がまだならshowページへ飛ぶ
    redirect_to action: "show" if card.exists?
  end

  def create
    Payjp.api_key = ENV["PAYJP_PRIVATE_KEY"]
    if params['payjp-token'].blank?
      redirect_to action: "new"
    else
      user_id = current_user.id
      customer = Payjp::Customer.create(
      card: params['payjp-token']
      ) 
      @card = CreditCard.new(user_id: user_id, customer_id: customer.id, card_id: customer.default_card)
      if @card.save
        # redirect_to purchase_products_path
        redirect_to controller: :users, action: :done
      else
        redirect_to action: "new"
      end
    end
  end
  
  # PAY.JPとCardのデータベース作成
  def pay 
    Payjp.api_key = ENV["PAYJP_PRIVATE_KEY"]
    if params['payjp-token'].blank?
      # paramsの中にjsで作った'payjpTokenが存在するか確かめる
      redirect_to action: "new"
    else
      customer = Payjp::Customer.create(
        card: params['payjp-token'],
        metadata: {user_id: current_user.id}
      ) 
      @card = CreditCard.new(user_id: current_user.id, customer_id: customer.id, card_id: customer.default_card)
      if @card.save
        redirect_to action: "show"
        flash[:notice] = 'クレジットカードの登録が完了しました'
      else
        redirect_to action: "pay"
        flash[:alert] = 'クレジットカード登録に失敗しました'
      end
    end
  end

  # PAY.JPとCardデータベースを削除
  def delete 
    card = CreditCard.where(user_id: current_user.id).first
    if card.blank?
    else
      Payjp.api_key = ENV["PAYJP_PRIVATE_KEY"]
      customer = Payjp::Customer.retrieve(card.customer_id)
      customer.delete
      card.delete
    end
      redirect_to action: "new"
  end

  #CardのデータPAY.JPに送り情報を取り出す
  def show 
    card = CreditCard.where(user_id: current_user.id).first
    if card.blank?
      redirect_to action: "new" 
    else
      Payjp.api_key = ENV["PAYJP_PRIVATE_KEY"]
      customer = Payjp::Customer.retrieve(card.customer_id)
      @default_card_information = customer.cards.retrieve(card.card_id)
    end
  end

end
