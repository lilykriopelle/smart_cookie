class Api::RecipesController < ApplicationController

  def index
    @recipes = Recipe.includes(:votes).where(nil)
    filters.each do |k, v|
      @recipes = @recipes.send(k, v) if v.present?
    end

    @recipes = @recipes.sort { |a,b| b.votes().size <=> a.votes().size }

    if (params[:page])
      @recipes = Kaminari.paginate_array(@recipes)
      .page(params[:page])
      .per(5)
    end

    render :index
  end

  def show
    @recipe = Recipe.includes(:author, :ingredients, :annotations, :votes).find(params[:id])
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
