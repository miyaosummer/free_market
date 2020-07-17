require 'rails_helper'

describe Product do
  describe '#create' do
  
#全項目の条件を満たした時は投稿できる
    it "全ての必須項目が入力されていたら投稿ができる" do
      user = create(:user)
      category = create(:product_category)
      product = build(:product)
      expect(product).to be_valid
    end

#文字が入力されているかチェックする
    it "nameが空欄の時は投稿できない" do
      product = build(:product, name: "")
      product.valid?
      expect(product.errors[:name]).to include("can't be blank")
    end
    it "descriptionが空欄の時は投稿できない" do
      product = build(:product, description: "")
      product.valid?
      expect(product.errors[:description]).to include("can't be blank")
    end
    it "priceが空欄の時は投稿できない" do
      product = build(:product, price: "")
      product.valid?
      expect(product.errors[:price]).to include("can't be blank")
    end
    it "product_category_idが空欄の時は投稿できない" do
      product = build(:product, product_category_id: "")
      product.valid?
      expect(product.errors[:product_category_id]).to include("can't be blank")
    end
    it "product_condition_idが空欄の時は投稿できない" do
      product = build(:product, product_condition_id: "")
      product.valid?
      expect(product.errors[:product_condition_id]).to include("can't be blank")
    end
    it "postage_way_idが空欄の時は投稿できない" do
      product = build(:product, postage_way_id: "")
      product.valid?
      expect(product.errors[:postage_way_id]).to include("can't be blank")
    end
    it "shipping_day_idが空欄の時は投稿できない" do
      product = build(:product, shipping_day_id: "")
      product.valid?
      expect(product.errors[:shipping_day_id]).to include("can't be blank")
    end
    it "prefecture_idが空欄の時は投稿できない" do
      product = build(:product, prefecture_id: "")
      product.valid?
      expect(product.errors[:prefecture_id]).to include("can't be blank")
    end

#文字数に関するテストコード
    it "nameが40文字以下の時は投稿できる" do
      user = create(:user)
      category = create(:product_category)
      product = build(:product, name: "ア" * 40)
      expect(product).to be_valid
    end
    it "nameが41文字以上の時は投稿できない" do
      user = create(:user)
      category = create(:product_category)
      product = build(:product, name: "ア" * 41)
      product.valid?
      expect(product.errors[:name]).to include("is too long (maximum is 40 characters)")
    end
    it "descriptionが1000文字以下の時は投稿できる" do
      user = create(:user)
      category = create(:product_category)
      product = build(:product, description: "ア" * 1000)
      expect(product).to be_valid
    end
    it "descriptionが1001文字以上の時は投稿できない" do
      user = create(:user)
      category = create(:product_category)
      product = build(:product, description: "ア" * 1001)
      product.valid?
      expect(product.errors[:description]).to include("is too long (maximum is 1000 characters)")
    end
#価格は有効範囲内かチェックする 300~9999999
    it "priceが300以上の場合は投稿できる" do
      user = create(:user)
      category = create(:product_category)
      product = build(:product, price:300)
      expect(product).to be_valid
    end
    it "priceが299以下の場合は投稿できない" do
      product = build(:product, price:299)
      product.valid?
      expect(product.errors[:price]).to include("must be greater than or equal to 300")
    end
    it "priceが9,999,999以下の場合は投稿できる" do
      user = create(:user)
      category = create(:product_category)
      product = build(:product, price:9999999)
      expect(product).to be_valid
    end
    it "priceが10,000,000以上の場合は投稿できない" do
      product = build(:product, price:10000000)
      product.valid?
      expect(product.errors[:price]).to include("must be less than or equal to 9999999")
    end
  end
end