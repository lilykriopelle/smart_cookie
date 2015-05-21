json.total_pages @recipes.total_pages

json.recipes do
   json.partial! 'api/recipes/recipe', collection: @recipes, as: :recipe
end
