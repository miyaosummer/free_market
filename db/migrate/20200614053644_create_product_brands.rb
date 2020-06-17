class CreateProductBrands < ActiveRecord::Migration[5.2]
  def change
    create_table :product_brands do |t|
      t.string   :brand_name, null: false
      t.timestamps
    end
  end
end
