json.extract! user, :name, :email, :id

json.authored_recipes user.authored_recipes do |recipe|
  json.extract! recipe, :id, :title
  json.image_url asset_path(recipe.image.url)
end

json.votes user.votes do |vote|
  json.extract! vote, :id, :voter_id
end

json._type "User"
