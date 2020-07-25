class CommentsController < ApplicationController
  def create
    comment = Comment.create(comment_params)
    redirect_to product_path(comment.product.id)
  end

  private
  def comment_params
    params.require(:comment).permit(:comment).merge(user_id: current_user.id, product_id: params[:product_id])
  end
end
