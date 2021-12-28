class ItemSerializer
  
  def initialize(item_object)
    @item = item_object
  end 

  def to_serialized_json
    options = {
      include: {
        comments: {
          except: [:updated_at]
        }
      },
      except: [:created_at, :updated_at]
    }
    @item.to_json(options)
  end

end
