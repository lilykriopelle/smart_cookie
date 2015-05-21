class Api::RecipesController < ApplicationController

  def index
    @recipes = Recipe.where(nil);
    filters.each do |k, v|
      @recipes = @recipes.send(k, v) if v.present?
    end

    if (params[:page])
      @recipes = @recipes.page(params[:page]).per(10)
    end

    render :index
  end

  def show
    @recipe = Recipe.includes(:recipes_ingredients, :annotations, :votes).find(params[:id])
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
      params.require(:recipe).permit(:title, :image, :instructions, :primary_tag, :servings,
      recipe_ingredients: [:name, :quantity, :unit, :optional])
    end

    def filters
      params.slice(:primary_tag, :author_id)
    end

end
