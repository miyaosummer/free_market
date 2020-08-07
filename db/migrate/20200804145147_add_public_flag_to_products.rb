class AddPublicFlagToProducts < ActiveRecord::Migration[5.2]
  def change
    add_column :products, :public_flag, :integer, default: 0, null: false
  end
end
