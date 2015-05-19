class Api::AnnotationRepliesController < ApplicationController

  def create
    @reply = AnnotationReply.new(reply_params)
    if @reply.save
      render :show
    else
      render json: @reply.errors.full_messages, status: :unprocessable_entity
    end
  end

  def destroy
    @reply = Reply.find(params[:id])
    render json: @reply.destroy
  end

  def index
    @replies = Annotation.find(params[:annotation_id]).replies
    render :index
  end

  private
    def reply_params
      params.require(:annotation_reply).permit(:annotation_id, :author_id, :body)
    end
end
