json.extract! @user, :name, :email, :id

json.authored_recipes @user.authored_recipes do |recipe|
  json.extract! recipe, :id, :title, :ingredients, :instructions
end

json.votes @user.votes do |vote|
  json.extract! vote, :id, :voter_id
end
