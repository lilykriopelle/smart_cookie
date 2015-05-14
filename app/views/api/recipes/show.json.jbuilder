json.extract! @recipe, :id, :title, :primary_tag

json.ingredients @recipe.recipes_ingredients do |recipe_ingredient|
  json.extract! recipe_ingredient.ingredient, :id, :name
  json.extract! recipe_ingredient, :quantity, :unit, :optional
  json.annotations @recipe.annotations do |annotation|
    json.extract! annotation, :start_idx, :end_idx, :author_id, :body
  end
end

json.annotations @recipe.annotations do |annotation|
  json.extract! annotation, :start_idx, :end_idx, :author_id, :body
end

json.extract! @recipe, :instructions
