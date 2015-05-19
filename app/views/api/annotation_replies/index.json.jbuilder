json.array! @replies do |reply|
  json.extract! reply, :id, :body
  json.author do
    json.extract! reply.author, :id, :name
  end
end
