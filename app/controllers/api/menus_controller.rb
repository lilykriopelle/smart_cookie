class Api::MenusController < ApplicationController

  def show
    @menu = Menu.find(params[:id])
    render :show
  end

  def create
  end

  private
    def menu_params
      params.require(:menu).permit(:title, :author_id)
    end

end
