class Api::RecipesController < ApplicationController

  def show
    @recipe = Recipe.find(params[:id])
    render :show
  end

  def create
    @recipe = RecipeParser.new().parse(recipe_params)
    @recipe.author_id = current_user.id

    if (@recipe.save)
      render :show
    else
      render json: @recipe.errors.full_messages, status: :unprocessable_entity
    end
  end

  def destroy
    Recipe.find(params[:id]).destroy
    render :show
  end

  private
    def recipe_params
      params.require(:recipe).permit(:title, :instructions,
      recipe_ingredients: [:name, :quantity, :unit])
    end

end
