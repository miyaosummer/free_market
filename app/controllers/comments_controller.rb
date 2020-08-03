class CommentsController < ApplicationController
  def create
    @comment = Comment.create(comment_params)
    @seller_of_product = @comment.product.seller
    @id_of_product = @comment.product.id
    if @comment.save
        respond_to do |format|
          format.html { redirect_to product_path(params[:product_id])  }
          format.json
        end
    else
      flash[:alert] = "保存できませんでした"
      redirect_to product_path(params[:product_id])
    end
  end

  def destroy
    comment = Comment.find_by(id: params[:id], product_id: params[:product_id])
    if comment.user_id == current_user.id && comment.destroy
      redirect_to product_path(comment.product.id)
    else
      redirect_to root_path
    end
  end

  private
  def comment_params
    params.require(:comment).permit(:comment).merge(user_id: current_user.id, product_id: params[:product_id])
  end
end
