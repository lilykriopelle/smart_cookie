json.extract! recipe, :id, :title, :primary_tag, :author_id, :servings
json.image_url asset_path(recipe.image.url(:original))
json.author recipe.author, :name, :id

json.ingredients recipe.recipes_ingredients do |recipe_ingredient|
  json.partial! 'api/recipes/ingredient', recipe_ingredient: recipe_ingredient
end

json.annotations recipe.annotations do |annotation|
  json.partial! 'api/annotations/annotation', annotation: annotation
end

json.extract! recipe, :instructions

json.num_votes recipe.votes.size
json.can_vote recipe.can_vote(current_user)
json.vote_id !recipe.can_vote(current_user) ? recipe.vote_id(current_user) : nil

json.intervals recipe.intervals_hash

json._type "Recipe"
