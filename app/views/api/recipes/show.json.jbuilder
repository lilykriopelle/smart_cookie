json.extract! @recipe, :id, :title, :primary_tag, :author_id, :servings

json.ingredients @recipe.recipes_ingredients do |recipe_ingredient|
  json.extract! recipe_ingredient.ingredient, :id, :name
  json.extract! recipe_ingredient, :quantity, :unit, :optional
  json.annotations recipe_ingredient.annotations do |annotation|
    json.extract! annotation, :id, :start_idx, :end_idx, :author_id, :body
    json.author annotation.author, :name, :id
  end
end

json.annotations @recipe.annotations do |annotation|
  json.extract! annotation, :id, :start_idx, :end_idx, :author_id, :body
  json.author annotation.author, :name, :id
end

json.extract! @recipe, :instructions
