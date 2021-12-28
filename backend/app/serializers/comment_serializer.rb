class CommentSerializer
  
  def initialize(comment_object)
    @comment = comment_object
  end

  def to_serialized_json
    options = {
      except: [:updated_at]
    }
    @comment.to_json(options)
  end 

end
