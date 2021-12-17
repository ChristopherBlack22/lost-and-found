class ItemsController < ApplicationController
    def index
        items = Item.all
        render json: ItemSerializer.new(items).to_serialized_json
    end 


    def show
        item = Item.find_by(id: params[:id])
        render json: item
    end

    # def create
    # end

    # def destroy
    # end
end
