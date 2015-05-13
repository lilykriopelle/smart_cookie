json.extract! @recipe, :id, :title

json.ingredients @recipe.recipes_ingredients do |rec_ing|
  json.extract! rec_ing.ingredient, :name
  json.extract! rec_ing, :quantity, :unit, :optional
end

json.extract! @recipe, :instructions
