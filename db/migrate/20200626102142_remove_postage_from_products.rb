class RemovePostageFromProducts < ActiveRecord::Migration[5.2]
  def change
    remove_column :products, :postage, :string
  end
end
