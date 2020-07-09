class UsersController < ApplicationController

  def index
  end

  def show
    @user = User.find(params[:id])
    @destination = @user.destination
  end

  ######################## ↓ クレジットカード関連 ↓ ########################
  # products_controllerにも記述あり
  require "payjp"
  
  before_action :card_present, only:[:credit_new, :credit_show, :credit_destroy]
  before_action :set_api_key
  before_action :set_customer, only:[:credit_show]
  before_action :set_card_information, only:[:credit_show]
  before_action :take_card, only:[:credit_show]
  
  # 新規作成
  def credit_new
    # @@path = Rails.application.routes.recognize_path(request.referer)
    if @card.present?
      redirect_to action: "credit_show"
    else
      @card = CreditCard.new
    end
  end

  # 登録
  def credit_create
    customer = Payjp::Customer.create(card: params['payjp-token'], metadata: {user_id: current_user.id})
    @card = CreditCard.new(user_id: current_user.id, customer_id: customer.id, card_id: customer.default_card)
    # 遷移元の情報を条件分岐に加える
    if @card.save
      redirect_to user_path(current_user), notice: "登録が完了しました"
    else
      redirect_to action: "credit_new", alert: "カード情報が正しくありません"
    end
  end

  # 情報表示
  def credit_show
    if @card.blank?
      redirect_to action: "credit_new"
    end
    @user = current_user
    @card = CreditCard.find_by(user_id: current_user.id)
    @card_brand = @card_information.brand
    case @card_brand
    when "Visa"
      @card_src = "visa.png"
    when "MasterCard"
      @card_src = "mastercard.png"
    when "JCB"
      @card_src = "JCB.png"
    when "American Express"
      @card_src = "AmericanExpress.png"
    when "Diners Club"
      @card_src = "DinersClub.png"
    when "Discover"
      @card_src = "DISCOVER.png"
    end
  end

  # 削除
  def credit_destroy
    @card = CreditCard.find_by(user_id: current_user.id)
    if @card.blank?
      redirect_to action: "credit_new"
    else
      Payjp.api_key = ENV["PAYJP_PRIVATE_KEY"]
      customer = Payjp::Customer.retrieve(@card.customer_id)
      customer.delete
      if @card.delete
        redirect_to user_path(current_user), notice: "削除完了しました"
      else
        redirect_to user_path(current_user), alert: "削除できませんでした"
      end
    end
  end

  private

  def card_present
    @card = CreditCard.where(user_id: current_user.id).first if CreditCard.where(user_id: current_user.id).present?
  end

  def set_api_key
    Payjp.api_key = ENV["PAYJP_PRIVATE_KEY"]
  end

  def set_customer
    @customer = Payjp::Customer.retrieve(@card.customer_id)
  end

  def set_card_information
    @card_information = @customer.cards.retrieve(@card.card_id)
  end

  def take_card
    @card = CreditCard.find_by(user_id: current_user.id)
  end
  ######################## ↑ クレジットカード関連 ↑ ########################

end
