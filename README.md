# README

This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

* Ruby version

* System dependencies

* Configuration

* Database creation

* Database initialization

* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions

# DB設計--------------------------------------------------------------------------------------

## users table
|Column          |Type      |Options    |
|----------------|----------|-----------|
|nickname        |string    |null: false|
|email           |string    |null: false, unique: true|
|password        |string    |null: false|
|last_name       |string    |null: false|
|first_name      |string    |null: false|
|last_name_kana  |string    |null: false|
|first_name_kana |string    |null: false|
|birthday        |date      |null: false|

### Association
- has_one  :destination, dependent: :destroy
- has_one  :credit_card, dependent: :destroy
- has_one  :sns_authentication, dependent: :destroy
- has_many :products
- has_many :comments, dependent: :destroy
- has_many :favorites, dependent: :destroy


## destinations table
|Column          |Type      |Options    |
|----------------|----------|-----------|
|last_name       |string    |null: false|
|first_name      |string    |null: false|
|last_name_kana  |string    |null: false|
|first_name_kana |string    |null: false|
|postal_code     |integer   |null: false|
|prefecture_id   |string    |null: false|
|city            |string    |null: false|
|block           |string    |null: false|
|building        |string    |null: false|
|phone_number    |string    |           |
|user_id         |references|null: false, foreign_key: true|

### Association
- belongs_to  :user
- belongs_to_active_hash :prefecture


## credit_cards table
|Column      |Type      |Options    |
|------------|----------|-----------|
|card_id     |string	  |null:false |
|customer_id |string	  |null:false |
|user_id     |references|null: false, foreign_key: true|

### Association
- belongs_to  :user


## sns_authentications table
|Column   |Type       |Options    |
|---------|-----------|-----------|
|provider |string     |null: false|
|uid      |string     |null: false, unique: true|
|user_id  |references |null: false, foreign_key: true|

### Association
- belongs_to  :user


## products table
|Column              |Type       |Options    |
|--------------------|-----------|-----------|
|name                |string     |null: false|
|description         |text       |null: false|
|price               |integer    |null: false|
|seller_id           |references |null: false, foreign_key: true|
|buyer_id            |references |null: false, foreign_key: true|
|product_category_id |references |null: false, foreign_key: true|
|product_condition_id|string     |null: false|
|postage_way_id      |string     |null: false|
|postage             |string     |null: false|
|shipping_day_id     |string     |null: false|
|product_brand_id    |references |foreign_key: true|
|product_size_id     |string     |           |
|prefecture_id       |string     |null: false|

### Association
- has_many :product_images, dependent: :destroy
- has_many :comments, dependent: :destroy
- has_many :favorites, dependent: :destroy
- belongs_to :seller, class_name: 'User', :foreign_key => 'seller_id'
- belongs_to :buyer,  class_name: 'User', :foreign_key => 'buyer_id'
- belongs_to :product_category
- belongs_to :product_brand
- belongs_to_active_hash :product_condition
- belongs_to_active_hash :postage_way
- belongs_to_active_hash :shipping_day
- belongs_to_active_hash :product_size
- belongs_to_active_hash :prefecture


## product_images table
|Column     |Type       |Options    |
|-----------|-----------|-----------|
|image      |text       |null: false|
|product_id |references |null: false, foreign_key: true|

### Association
- belongs_to :product


## product_categories table
|Column   |Type   |Options     |
|---------|-------|------------|
|name     |string |null: false |
|ancestry |string |            |

### Association
- has_many :products


## product_brands table
|Column     |Type   |Options     |
|-----------|-------|------------|
|brand_name |string |null: false |

### Association
has_many :products


## comments table
|Column     |Type       |Options    |
|-----------|-----------|-----------|
|comment    |text       |null: false|
|user_id    |references |null: false, foreign_key: true|
|product_id |references |null: false, foreign_key: true|

### Association
- belongs_to :user
- belongs_to :product


## favorites table
|Column     |Type       |Options    |
|-----------|-----------|-----------|
|user_id    |references |null: false, foreign_key: true|
|product_id |references |null: false, foreign_key: true|

### Association
- belongs_to :user
- belongs_to :product
