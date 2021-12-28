class Comment < ApplicationRecord
    belongs_to :item

    validates :commenters_name, :content, :item_id, presence: true

end
