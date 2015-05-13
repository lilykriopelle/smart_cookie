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

    ingredient_names.each do |name|
      ingredient = Ingredient.find_by({name: name})

      if (!ingredient)
        ingredient = Ingredient.new({name: name})
        if (ingredient.save!)
          ids << ingredient.id
        end
      else
        ids << ingredient.id
      end

    end

    @recipe.ingredient_ids = ids
  end

  def create_new_ingredient(name)
    ingredient = Ingredient.new({name: name})
    ingredient.save!
  end

end
