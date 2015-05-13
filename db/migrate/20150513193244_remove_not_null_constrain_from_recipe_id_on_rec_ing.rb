class RemoveNotNullConstrainFromRecipeIdOnRecIng < ActiveRecord::Migration
  def change
    remove_column :recipes_ingredients, :recipe_id, :integer
    add_column :recipes_ingredients, :recipe_id, :integer
  end
end
