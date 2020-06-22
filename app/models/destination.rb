class Destination < ApplicationRecord
#アクティブハッシュとの連携
  extend ActiveHash::Associations::ActiveRecordExtensions

#文字入力の制約
  VALID_KATAKANA_REGEX = /\A[\p{katakana}\p{blank}ー－]+\z/
  VALID_POSTAL_CODE = /\A\d{3}-\d{4}\z/i

#テーブル間のアソシエーション
  belongs_to :user
  belongs_to_active_hash :prefecture

#各項目のバリデーション
  validates :first_name,       presence: true, length: { maximum: 35 }
  validates :last_name,        presence: true, length: { maximum: 35 }
  validates :first_name_kana,  presence: true, length: { maximum: 35 }, format: { with: VALID_KATAKANA_REGEX, message: 'はカタカナで入力して下さい'}
  validates :last_name_kana,   presence: true, length: { maximum: 35 }, format: { with: VALID_KATAKANA_REGEX, message: 'はカタカナで入力して下さい'}
  validates :postal_code,      presence: true, length: { maximum: 8 }, format: { with: VALID_POSTAL_CODE, message: 'のフォーマットが不適切です' }
  validates :prefecture_id,    presence: true, numericality: { only_integer: true, less_than: 49 }
  validates :city,             presence: true, length: { maximum: 50 }
  validates :block,            presence: true, length: { maximum: 50 }
  validates :phone_number,     format: { with: /\A\d{10,11}\z/, message: 'の入力が正しくありません'}


end
