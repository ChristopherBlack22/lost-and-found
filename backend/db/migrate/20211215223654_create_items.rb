class CreateItems < ActiveRecord::Migration[6.1]
  def change
    create_table :items do |t| 
      t.string :item_name
      t.string :description
      t.string :image_url
      t.string :last_known_location
      t.datetime :last_seen_date
      t.boolean :lost_status
      t.boolean :found_status
      t.string :posters_name

      t.timestamps
    end
  end
end
