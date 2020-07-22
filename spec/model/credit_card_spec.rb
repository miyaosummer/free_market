require 'rails_helper'

describe CreditCard do
  describe '#create' do
    it '全ての項目を入力すると登録できる' do
      user = create(:user)
      card = build(:credit_card, user_id: user.id)
      card.valid?
      expect(card).to be_valid
    end

    it 'customer_idがないと登録できない' do
      user = create(:user)
      card = build(:credit_card, user_id: user.id, customer_id: "")
      card.valid?
      expect(card.errors[:customer_id]).to include("can't be blank")
    end

    it 'card_idがないと登録できない' do
      user = create(:user)
      card = build(:credit_card, user_id: user.id, card_id: "")
      card.valid?
      expect(card.errors[:card_id]).to include("can't be blank")
    end
  end
end