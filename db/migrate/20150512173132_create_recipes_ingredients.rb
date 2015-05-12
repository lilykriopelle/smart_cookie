class CreateRecipesIngredients < ActiveRecord::Migration
  def change
    create_table :recipes_ingredients do |t|
      t.integer :recipe_id, null: false
      t.integer :ingredient_id, null: false
      t.boolean :optional, null: false, default: false
      t.timestamps null: false
    end

    add_index :recipes_ingredients, :recipe_id
    add_index :recipes_ingredients, :ingredient_id
    add_index :recipes_ingredients, [:recipe_id, :ingredient_id], unique: true
  end
end
