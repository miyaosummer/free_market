class CreateDrafts < ActiveRecord::Migration[5.2]
  def change
    create_table :drafts do |t|
      t.string       :name
      t.text         :description
      t.integer      :price
      t.references   :seller,                foreign_key: {to_table: :users}
      t.references   :buyer,                 foreign_key: {to_table: :users}
      t.references   :product_category,      foreign_key: true
      t.string       :product_condition_id
      t.string       :postage_way_id
      t.string       :shipping_day_id
      t.references   :product_brand,         foreign_key: true
      t.string       :product_size_id
      t.string       :prefecture_id
      t.timestamps
    end
  end
end
