json.extract! @recipe, :id, :title
json.ingredients @recipe.ingredients, :id, :name
json.extract! @recipe, :instructions
