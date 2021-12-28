class ItemsController < ApplicationController

    def index
        items = Item.all
        render json: ItemSerializer.new(items).to_serialized_json
    end 

    def create
        item = Item.new(item_params)
        if item.save
            render json: ItemSerializer.new([item]).to_serialized_json
        else
            render json: item.errors.full_messages
        end 
    end

    private

    def item_params
        params.require(:item).permit(:item_name, :description, :image_url, :lost_status, :found_status, :last_known_location, :last_seen_date, :posters_name)
    end 

end
