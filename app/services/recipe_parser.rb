class RecipeParser
  def parse(params)
    @recipe = Recipe.new({
      title: params[:title],
      instructions: params[:instructions]
    });
    parse_ingredients(params[:recipe_ingredients].values)
    @recipe
  end

  def parse_ingredients(recipe_ingredients)
    ids = [];

    if recipe_ingredients
      recipe_ingredients.each do |recipe_ingredient|
        name = recipe_ingredient[:name]
        next if name == ""
        ingredient = Ingredient.find_by({name: name}) || new_ingredient(name)
        ingredient.persisted? && (ids << ingredient.id)
        # byebug
      end
    end

    @recipe.ingredient_ids = ids
  end

  def new_ingredient(name)
    ingredient = Ingredient.new({name: name})
    ingredient.save!
    ingredient
  end

end
