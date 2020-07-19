class Draft < ApplicationRecord
  extend ActiveHash::Associations::ActiveRecordExtensions
  belongs_to_active_hash :prefecture
  belongs_to_active_hash :product_condition
  belongs_to_active_hash :postage_way
  belongs_to_active_hash :shipping_day
  belongs_to_active_hash :product_size
  has_many :product_images, dependent: :destroy
  belongs_to :seller, class_name: 'User', :foreign_key => 'seller_id'
  belongs_to :buyer, class_name: 'User', :foreign_key => 'buyer_id', optional: true
  belongs_to :product_category, optional: true
  belongs_to :product_brand, optional: true
  accepts_nested_attributes_for :product_images, allow_destroy: true

end