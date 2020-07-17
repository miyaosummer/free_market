require 'rails_helper'

describe ProductImage do
  describe '#create' do
#画像に関するテスト
    it "画像がある場合は投稿できる" do
      product = build(:product)
      product_image = build(:product_image)
      expect(product_image).to be_valid
    end
    it "画像が無い場合は投稿できない" do
      product = build(:product)
      product_image = build(:product_image, image:"")
      product_image.valid?
      expect(product_image.errors[:image]).to include("can't be blank")
    end
  end
end