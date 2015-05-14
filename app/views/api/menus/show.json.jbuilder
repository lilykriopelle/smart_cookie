json.extract! @menu, :id, :author_id, :title

json.recipes @menu.recipes do |recipe|
  json.extract! recipe, :title, :id
end
