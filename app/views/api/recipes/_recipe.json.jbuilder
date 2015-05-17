json.extract! recipe, :id, :title, :primary_tag, :author_id, :servings

json.ingredients recipe.recipes_ingredients do |recipe_ingredient|
  json.partial! 'ingredient', recipe_ingredient: recipe_ingredient
end

json.annotations recipe.annotations do |annotation|
  json.partial! 'annotation', annotation: annotation
end

json.extract! recipe, :instructions
