class AddPrimaryTagToRecipes < ActiveRecord::Migration
  def change
    add_column :recipes, :primary_tag, :string, null: false
  end
end
