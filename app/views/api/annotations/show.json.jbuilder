json.extract! @annotation, :id, :annotatable_id, :annotatable_type, :start_idx, :end_idx, :body
json.author @annotation.author, :name, :id

json.votes @annotation.votes do |vote|
  json.extract! vote, :id, :voter_id
end

json.replies @annotation.replies do |reply|
  json.extract! reply, :id, :body
  json.author do
    json.extract! reply.author, :id, :name
  end
end
