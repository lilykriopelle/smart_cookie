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
    head :no_content
  end

  private
    def recipe_params
      params.require(:recipe).permit(:title, :instructions, :primary_tag, 
      recipe_ingredients: [:name, :quantity, :unit, :optional])
    end

end
