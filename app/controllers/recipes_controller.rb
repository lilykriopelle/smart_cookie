class RecipesController < ApplicationController

  def create
    @recipe = Recipe.new(recipe_params)
    @recipe.author_id = current_user.id
    
    if (@recipe.save)
      redirect_to user_url(current_user)
    else
      flash.now[:error] = @recipe.errors.full_messages
      redirect_to user_url(current_user)
    end
  end

  private
    def recipe_params
      params.require(:recipe).permit(:title, :instructions)
    end

end
