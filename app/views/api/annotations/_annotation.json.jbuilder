json.extract! annotation, :id, :annotatable_id, :annotatable_type, :start_idx, :end_idx, :body
json.image_url asset_path(annotation.image.url(:original))
json.author annotation.author, :name, :id

json.num_votes annotation.votes.size
json.can_vote annotation.can_vote(current_user)
json.vote_id !annotation.can_vote(current_user) ? annotation.vote_id(current_user) : nil

json.replies annotation.replies do |reply|
  json.partial! 'api/annotation_replies/reply', reply: reply
end
