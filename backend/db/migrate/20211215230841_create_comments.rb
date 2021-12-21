class CreateComments < ActiveRecord::Migration[6.1]
  def change
    create_table :comments do |t|
      t.string :commenters_name
      t.string :content
      t.integer :item_id

      t.timestamps
    end
  end
end
