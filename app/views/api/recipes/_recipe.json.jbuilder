json.extract! recipe, :id, :title, :primary_tag, :author_id, :servings

json.image_url asset_path(recipe.image.url(:original))

json.author recipe.author, :name, :id

json.ingredients recipe.recipes_ingredients do |recipe_ingredient|
  json.partial! 'api/recipes/ingredient', recipe_ingredient: recipe_ingredient
end

json.annotations recipe.annotations do |annotation|
  json.partial! 'api/recipes/annotation', annotation: annotation
end

json.extract! recipe, :instructions

json.votes recipe.votes do |vote|
  json.extract! vote, :id, :voter_id
end

json.intervals recipe.intervals_hash

json._type "Recipe"
