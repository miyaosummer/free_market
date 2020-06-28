class ChangeColumnToAllowNull < ActiveRecord::Migration[5.2]
  def up
    change_column :destinations, :building,:string, null: true
  end

  def down
    change_column :destinations, :building,:string, null: false
  end
end