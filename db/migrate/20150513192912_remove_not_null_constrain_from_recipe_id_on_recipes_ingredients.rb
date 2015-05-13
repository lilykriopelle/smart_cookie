class RemoveNotNullConstrainFromRecipeIdOnRecipesIngredients < ActiveRecord::Migration
  def change
    change_column :recipes_ingredients, :recipe_id, :integer
  end
end
