class CreateItems < ActiveRecord::Migration[6.1]
  def change
    create_table :items do |t|
      t.string :name
      t.string :description
      t.string :image_url
      t.string :llast_seen_location
      t.boolean :lst_status
      t.boolean :found_status

      t.timestamps
    end
  end
end
