json.extract! user, :name, :id

json.authored_recipes user.authored_recipes do |recipe|
  json.extract! recipe, :id, :title
  json.image_url asset_path(recipe.image.url)
  json.num_votes recipe.votes.size
end

json.menus user.menus do |menu|
  json.extract! menu, :id, :title
  json.num_votes menu.votes.size
end

json.num_votes user.votes.size
json.can_vote user.can_vote(current_user)
json.vote_id !user.can_vote(current_user) ? user.vote_id(current_user) : nil

json._type "User"
