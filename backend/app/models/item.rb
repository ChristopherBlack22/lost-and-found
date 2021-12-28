class Item < ApplicationRecord
    has_many :comments

    validates :item_name, :description, :image_url, :last_known_location, :last_seen_date, :posters_name, presence: true
    validate :lost_or_found

    def lost_or_found
        if lost_status == false && found_status == false
            errors.add(:_lost_or_found, "Reported items must be one or the other")
        end 
    end 

end
