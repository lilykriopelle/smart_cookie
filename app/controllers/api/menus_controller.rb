class Api::MenusController < ApplicationController

  def show
    @menu = Menu.find(params[:id])
    render :show
  end

  def create
    @menu = MenuParser.new.parse(menu_params)
    @menu.author_id = current_user.id
    if @menu.save
      render :show
    else
      render json: @menu.errors.full_messages, status: :unprocessable_entity
    end
  end

  def destroy
    @menu = Menu.find(params[:id])
    render json: @menu.destroy
  end

  private
    def menu_params
      params.require(:menu).permit(:title, recipes: [:ord, :recipe_id])
    end

end
