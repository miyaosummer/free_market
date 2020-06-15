class CreateDestinations < ActiveRecord::Migration[5.2]
  def change
    create_table :destinations do |t|
      t.string	      :last_name,          null: false
      t.string	      :first_name,         null: false
      t.string	      :last_name_kana,     null: false
      t.string	      :first_name_kana,    null: false
     	t.integer	      :postal_code,        null: false
      t.string	      :prefecture_id,      null: false
    	t.string	      :city,               null: false
    	t.string       	:block,              null: false
    	t.string      	:building,           null: false
      t.string       	:phone_number
      t.references  	:user,               null: false, foreign_key: true
      t.timestamps
    end
  end
end
