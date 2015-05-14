class CreateMenusRecipes < ActiveRecord::Migration
  def change
    create_table :menus_recipes do |t|
      t.integer :menu_id, null: false
      t.integer :recipe_id, null: false
      t.integer :ord, null: false

      t.timestamps null: false
    end

    add_index :menus_recipes, :menu_id
    add_index :menus_recipes, :recipe_id
  end
end
