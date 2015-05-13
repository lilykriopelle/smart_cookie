class RecipeParser
  def parse(params)
    @recipe = Recipe.new({
      title: params[:title],
      instructions: params[:instructions]
    });
    parse_ingredients(params[:ingredient_names])
    @recipe
  end

  def parse_ingredients(ingredient_names)
    ids = [];

    if ingredient_names
      ingredient_names.each do |name|
        next if name == ""
        ingredient = Ingredient.find_by({name: name}) || new_ingredient(name)
        ingredient.persisted? && (ids << ingredient.id)
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
