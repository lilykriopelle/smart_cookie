if @recipes.try(:total_pages)
  json.total_pages @recipes.total_pages
end

json.recipes do
   json.partial! 'api/recipes/recipe_search_result', collection: @recipes, as: :recipe
end
