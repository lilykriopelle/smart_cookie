class AddQuantityAndUnitToRecipesIngredients < ActiveRecord::Migration
  def change
    add_column :recipes_ingredients, :quantity, :float, null: false
    add_column :recipes_ingredients, :unit, :string, null: false
  end
end
