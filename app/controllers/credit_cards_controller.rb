class CreditCardsController < ApplicationController

  require "payjp"

  before_action :set_product, only: [:show, :pay]
  before_action :card_present, only:[:new, :show, :destroy]
  before_action :set_api_key
  before_action :set_customer, only:[:show]
  before_action :set_card_information, only:[:show]
  before_action :take_card, only:[:show, :pay]

  # 一覧表示
  def index
  end

  # 新規作成
  def new
    @card = CreditCard.new
  end

  # 登録
  def create
    customer = Payjp::Customer.create(card: params['payjp-token'], metadata: {user_id: current_user.id})
    @card = CreditCard.new(user_id: current_user.id, customer_id: customer.id, card_id: customer.default_card)
    if @card.save
      redirect_to action: "purchase", notice: "登録が完了しました"
    else
      redirect_to action: "new", alert: "カード情報が正しくありません"
    end
  end

  # 情報表示
  def show
    if @card.blank?
      redirect_to action: "new"
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
  def destroy
    @card = CreditCard.find_by(user_id: current_user.id)
    if @card.blank?
      redirect_to action: "new"
    else
      Payjp.api_key = ENV["PAYJP_PRIVATE_KEY"]
      customer = Payjp::Customer.retrieve(@card.customer_id)
      customer.delete
      if @card.delete
        redirect_to purchase_products_path(current_user), notice: "削除完了しました"
      else
        redirect_to purchase_products_path(current_user), alert: "削除できませんでした"
      end
    end
  end

  # 購入
  def purchase
    @card = CreditCard.where(user_id: current_user.id).first
    charge = Payjp::Charge.create(
      amount: @product.price,
      customer: Payjp::Customer.retrieve(@card.customer_id),
      currency: 'jpy'
    )
    @product_buyer= Product.find(params[:id])
    @product_buyer.update(buyer_id: current_user.id)
    redirect_to root_path(current_user.id)
  end

  private

  def set_product
    @product = Product.find(params[:id])
  end

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

end
