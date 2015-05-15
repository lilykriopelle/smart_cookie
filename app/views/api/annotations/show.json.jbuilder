json.extract! @annotation, :id, :annotatable_id, :annotatable_type, :start_idx, :end_idx, :body
json.extract! @annotation.author, :name
