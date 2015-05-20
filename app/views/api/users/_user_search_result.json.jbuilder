json.extract! user, :name, :id

json.num_votes user.votes.length

json._type "User"
