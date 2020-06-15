class Product < ApplicationRecord
  has_many :product_images, dependent: :destroy
  has_many :comments, dependent: :destroy
  has_many :favorites, dependent: :destroy
  belongs_to :seller, class_name: 'User', :foreign_key => 'seller_id'
  belongs_to :buyer, class_name: 'User', :foreign_key => 'buyer_id'
  belongs_to :product_category
  belongs_to :product_brand
  belongs_to_active_hash :product_condition
  belongs_to_active_hash :postage_way
  belongs_to_active_hash :shipping_day
  belongs_to_active_hash :product_size
  belongs_to_active_hash :prefecture
end
