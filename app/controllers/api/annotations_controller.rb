class Api::AnnotationsController < ApplicationController

  def show
    @annotation = Annotation.find(params[:id])
    render :show
  end

  def create
  end

  private
    def annotation_params
      params.require(:annotation).permit(:annotatable_id, :author_id, :start_idx. :end_idx, :body)
    end

end
