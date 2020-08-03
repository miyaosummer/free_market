class ProductImage < ApplicationRecord
  belongs_to :product
  mount_uploader :image, ImageUploader

  #validation
  validates :image   , presence: true
end
