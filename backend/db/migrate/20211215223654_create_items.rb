class CreateItems < ActiveRecord::Migration[6.1]
  def change
    create_table :items do |t|
      t.string :name
      t.string :description
      t.string :image_url
      t.string :last_seen_location
      t.boolean :lost_status
      t.boolean :found_status
      t.integer :user_id

      t.timestamps
    end
  end
end
