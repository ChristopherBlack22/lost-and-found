class ItemsController < ApplicationController
    def index
        items = Item.all
        #
        render json: ItemSerializer.new(items)#, options)
    end 
    #DO I NEED TO USE OPTIONS TO BE MORE SELECTIVE WITH JSON DATA BUT HAVE TO DEAL WITH INCREASED NESTING?

    def show
        item = Item.find_by(id: params[:id])
        render json: item
    end

    # def create
    # end

    # def destroy
    # end
end
