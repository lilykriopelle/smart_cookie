class Api::AnnotationsController < ApplicationController

  def index
  end

  def show
    @annotation = Annotation.find(params[:id])
    render :showw
  end

  def create
    @annotation = Annotation.new(annotation_params)
    if (@annotation.save)
      render :show
    else
      render json: @annotation.errors.full_messages, status: :unprocessable_entity
    end
  end

  private
    def annotation_params
      params.require(:annotation).permit(:annotatable_id, :annotatable_type, :author_id, :start_idx, :end_idx, :body)
    end

end
