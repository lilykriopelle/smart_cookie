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
#

class Recipe < ActiveRecord::Base
  validates :author_id, :title, :instructions, :ingredients, presence: true

  belongs_to :author, class_name: "User"
  has_many :recipes_ingredients, class_name: "RecipesIngredient", foreign_key: :recipe_id, inverse_of: :recipe
  has_many :ingredients, through: :recipes_ingredients, source: :ingredient
end
