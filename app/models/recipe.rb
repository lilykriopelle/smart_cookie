# == Schema Information
#
# Table name: recipes
#
#  id           :integer          not null, primary key
#  author_id    :integer          not null
#  title        :string           not null
#  instructions :text             not null
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#  primary_tag  :string           not null
#

class Recipe < ActiveRecord::Base
  validates :author_id, :title, :instructions, presence: true

  belongs_to :author, class_name: "User"
  has_many :recipes_ingredients, class_name: "RecipesIngredient", foreign_key: :recipe_id, inverse_of: :recipe
  has_many :ingredients, through: :recipes_ingredients, source: :ingredient
  has_many :menus_recipes, class_name: "MenusRecipe"
  has_many :recipes, through: :menus_recipes, source: :recipe

  TAGS = %w(appetizer entree side sandwich soup salad grilling dessert drink snack)

end
