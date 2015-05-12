class Api::RecipesController < ApplicationController

  def show
    @recipe = Recipe.find(params[:id])
    render :show
  end

  def create
    @recipe = current_user.authored_recipes.new(recipe_params)
    if (@recipe.save)
      render :show
    else
      render json: @board.errors.full_messages, status: :unprocessable_entity
    end
  end

  private
    def recipe_params
      params.require(:recipe).permit(:title, :instructions, ingredient_ids: [])
    end

end
