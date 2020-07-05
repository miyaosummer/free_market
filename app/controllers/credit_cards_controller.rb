class CreditCardsController < ApplicationController

  require "payjp"

  def new
    card = CreditCard.where(user_id: current_user.id)
    if card.exists?
      redirect_to action: "show" 
    end
    @card = CreditCard.new
  end

  # クレジットカード登録
  def create
    Payjp.api_key = ENV["PAYJP_PRIVATE_KEY"]
    customer = Payjp::Customer.create(card: params['payjp-token'], metadata: {user_id: current_user.id})
    @card = CreditCard.new(user_id: current_user.id, customer_id: customer.id, card_id: customer.default_card)
    if @card.save
      # redirect_to users_path(current_user), notice: "登録が完了しました"
      redirect_to purchase_products_path(current_user), notice: "登録が完了しました"
    else
      redirect_to action: "new", alert: "カード情報が正しくありません"
    end
  end

  # クレジットカード情報
  def show
    Payjp.api_key = ENV["PAYJP_PRIVATE_KEY"]
    card = CreditCard.where(user_id: current_user.id).first
    if card.blank?
      redirect_to action: "new" 
    end
    @user = current_user
    @card = CreditCard.find_by(user_id: current_user.id)
    customer = Payjp::Customer.retrieve(@card.customer_id)
    @customer_card = customer.cards.retrieve(@card.card_id)
    @card_brand = @customer_card.brand
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

  def pay
    @card = CreditCard.where(user_id: current_user.id).first
    @product = Product.find(params[:id])
    Payjp.api_key = ENV["PAYJP_PRIVATE_KEY"]
    charge = Payjp::Charge.create(
      amount: @product.price,
      customer: Payjp::Customer.retrieve(@card.customer_id),
      currency: 'jpy'
    )
    @product_buyer= Product.find(params[:id])
    @product_buyer.update(buyer_id: current_user.id)
    redirect_to purchase_products_path(current_user.id)
  end

end
