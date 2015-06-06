json.extract! @menu, :id, :author_id, :title

json.author @menu.author, :name, :id

json.num_votes @menu.votes.size
json.can_vote @menu.can_vote(current_user)
json.vote_id !@menu.can_vote(current_user) ? @menu.vote_id(current_user) : nil

json.recipes @menu.recipes do |recipe|
  json.partial! "api/recipes/recipe_search_result", recipe: recipe
end
