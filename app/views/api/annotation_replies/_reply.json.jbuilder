json.extract! reply, :id, :body
json.author do
  json.extract! reply.author, :id, :name
end

json.num_votes reply.votes().size
json.can_vote reply.can_vote(current_user)
json.vote_id !reply.can_vote(current_user) ? reply.vote_id(current_user) : nil
