json.extract! recipe_ingredient, :id
json.extract! recipe_ingredient.ingredient, :name
json.extract! recipe_ingredient, :quantity, :unit, :optional
json.annotations recipe_ingredient.annotations do |annotation|
  json.partial! 'annotation', annotation: annotation
end