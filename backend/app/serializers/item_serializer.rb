class ItemSerializer
  include FastJsonapi::ObjectSerializer
  attributes :name, :description, :image_url, :last_location, :last_date, :lost_status, :found_status, :user, :comments
end
