json.extract! recipe, :id, :title
json.image_url asset_path(recipe.image.url(:original))
json.num_votes recipe.votes().length
json._type "Recipe"
