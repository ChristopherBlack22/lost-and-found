class CommentsController < ApplicationController

    def create
        comment = Comment.new(comment_params)
        if comment.save
            render json: CommentSerializer.new([comment]).to_serialized_json
        else
            render json: comment.errors.full_messages
        end 
    end

    private

    def comment_params
        params.require(:comment).permit(:commenters_name, :content, :item_id)
    end 

end