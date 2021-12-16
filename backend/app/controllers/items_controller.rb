class ItemsController < ApplicationController
    def index
        items = Item.all
        render json: items, except: [:created_at, :updated_at]
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
