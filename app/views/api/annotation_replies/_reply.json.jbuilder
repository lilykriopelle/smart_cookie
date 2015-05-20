json.extract! reply, :id, :body
json.author do
  json.extract! reply.author, :id, :name
end

json.votes reply.votes do |vote|
  json.extract! vote, :id, :voter_id
end
