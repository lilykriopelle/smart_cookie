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
      recipe_ingredients.each do |recipe_ingredient_params|
        name = recipe_ingredient_params[:name]
        next if name.blank?
        ingredient = Ingredient.find_or_create_by({name: name})

        if ingredient.persisted?
          new_recipes_ingredient(ingredient, recipe_ingredient_params)
        end
      end
    end
  end

  def new_recipes_ingredient(ingredient, ri_params)
    recipe_ingredient = @recipe.recipes_ingredients.new()
    recipe_ingredient.recipe = @recipe
    recipe_ingredient.ingredient = ingredient
    recipe_ingredient.quantity = ri_params[:quantity]
    recipe_ingredient.unit = "cups"
    recipe_ingredient.save!
  end

  def new_ingredient(name)
    ingredient = Ingredient.new({name: name})
    ingredient.save!
    ingredient
  end

end
