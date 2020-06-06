# README

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
|birth_year      |integer   |null: false|
|birth_month     |integer   |null: false|
|birth_day       |integer   |null: false|

### Association
- has_one  :destination
- has_one  :credit_card
- has_one  :sns_authentication
- has_many :products
- has_many :comments
- has_many :favorites


## destinations table
|Column          |Type      |Options    |
|----------------|----------|-----------|
|last_name       |string    |null: false|
|first_name      |string    |null: false|
|last_name_kana  |string    |null: false|
|first_name_kana |string    |null: false|
|postal_code     |integer   |null: false|
|prefecture_id   |integer   |null: false, foreign_key: true|
|city            |string    |null: false|
|block           |string    |null: false|
|building        |string    |null: false|
|phone_number    |integer   |           |
|user_id         |references|null: false, foreign_key: true|

### Association
- belongs_to  :user
- belongs_to_active_hash :prefecture


## credit_cards table
|Column           |Type      |Options    |
|-----------------|----------|-----------|
|card_number      |integer   |null: false|
|expiration_year  |integer   |null: false|
|expiration_month |integer   |null: false|
|security_code    |integer   |null: false|
|user_id          |references|null: false, foreign_key: true|

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
|product_image_id    |references |null: false, foreign_key: true|
|product_category_id |references |null: false, foreign_key: true|
|product_condition_id|references |null: false, foreign_key: true|
|postage_way_id      |references |null: false, foreign_key: true|
|postage             |string     |null: false|
|shipping_day_id     |references |null: false, foreign_key: true|
|product_brand_id    |references |foreign_key: true|
|product_size_id     |references |foreign_key: true|
|prefecture_id       |references |null: false, foreign_key: true|

### Association
- has_many :product_images
- has_many :comments
- has_many :favorites
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
|ancestry |string |null: false |

### Association
- has_many :products


## product_brands table
|Column     |Type   |Options |
|-----------|-------|--------|
|brand_name |string |	       |

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
