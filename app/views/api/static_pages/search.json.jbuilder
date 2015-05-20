json.total_pages @search_results.total_pages

json.search_results @search_results.map(&:searchable) do |search_result|
  if search_result.is_a? Recipe
    json.partial! "api/recipes/recipe", recipe: search_result
  else
    json.partial! "api/users/user", user: search_result
  end
end
