class CreateProducts < ActiveRecord::Migration[5.2]
  def change
    create_table :products do |t|
      t.string       :name,                   null: false
      t.text         :description,            null: false
      t.integer      :price,                  null: false
      t.references   :seller,                 null: false, foreign_key: {to_table: :users}
      t.references   :buyer,                  foreign_key: {to_table: :users}
      t.references   :product_category,       null: false, foreign_key: true
      t.string       :product_condition_id,   null: false
      t.string       :postage_way_id,         null: false
      t.string       :postage,                null: false
      t.string       :shipping_day_id,        null: false
      t.references   :product_brand,          foreign_key: true
      t.string       :product_size_id,        null: false
      t.string       :prefecture_id,          null: false
      t.timestamps
    end
  end
end
