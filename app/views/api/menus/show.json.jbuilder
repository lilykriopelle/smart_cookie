json.extract! @menu, :id, :author_id, :title

json.author @menu.author, :name, :id

json.recipes @menu.recipes do |recipe|
  json.partial! "api/recipes/recipe_search_result", recipe: recipe
end
