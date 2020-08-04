class RemoveProductCategoryFromProducts < ActiveRecord::Migration[5.2]
  def change
    remove_reference :products, :product_category, foreign_key: true
  end
end
