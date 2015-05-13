class RemoveCompoundIndexFromRecipesIngredients < ActiveRecord::Migration
  def change
    remove_index :recipes_ingredients, [:recipe_id, :ingredient_id]
  end
end
