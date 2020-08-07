class ChangeProductColumnToAllowNull < ActiveRecord::Migration[5.2]

  def up
    # remove the NOT NULL constraints of Products table for draft function
    change_column :products, :name,                :string,     null: true
    change_column :products, :description,         :text,       null: true
    change_column :products, :price,               :integer,    null: true
    change_column :products, :product_condition_id,:string,     null: true
    change_column :products, :postage_way_id,      :string,     null: true
    change_column :products, :shipping_day_id,     :string,     null: true
    change_column :products, :product_size_id,     :string,     null: true
    change_column :products, :prefecture_id,       :string,     null: true
  end

  def down
    # remove the NOT NULL constraints of Products table for draft function
    change_column :products, :name,                :string,     null: false
    change_column :products, :description,         :text,       null: false
    change_column :products, :price,               :integer,    null: false
    change_column :products, :product_condition_id,:string,     null: false
    change_column :products, :postage_way_id,      :string,     null: false
    change_column :products, :shipping_day_id,     :string,     null: false
    change_column :products, :product_size_id,     :string,     null: false
    change_column :products, :prefecture_id,       :string,     null: false    
  end

end
