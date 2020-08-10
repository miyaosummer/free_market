class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable, :recoverable, :rememberable, :validatable

  VALID_EMAIL_REGEX = /\A[\w+\-.]+@[a-z\d\-.]+\.[a-z]+\z/i
  VALID_PASSWORD_REGEX = /\A(?=.*?[a-z])(?=.*?\d)[a-z\d]+\z/i
  VALID_KATAKANA_REGEX = /[\p{katakana}　ー－&&[^ -~｡-ﾟ]]+/

  validates :nickname,         presence: true, length: { maximum: 20 }
  validates :email,            presence: true, uniqueness: true, format: { with: VALID_EMAIL_REGEX }
  validates :password,         presence: true, length: { minimum: 7 }, format: { with: VALID_PASSWORD_REGEX }
  validates :birthday,         presence: true
  validates :first_name,       presence: true, length: { maximum: 35 }
  validates :last_name,        presence: true, length: { maximum: 35 } 
  validates :first_name_kana,  presence: true, length: { maximum: 35 }, format: { with: VALID_KATAKANA_REGEX, message: 'は全角カタカナで入力して下さい'}
  validates :last_name_kana,   presence: true, length: { maximum: 35 }, format: { with: VALID_KATAKANA_REGEX, message: 'は全角カタカナで入力して下さい'}

  has_one :destination,        dependent: :destroy
  has_one :credit_card,        dependent: :destroy
  has_one :sns_authentication, dependent: :destroy
  has_many :products
  has_many :comments,          dependent: :destroy
  has_many :favorites,         dependent: :destroy

  accepts_nested_attributes_for :destination
end
