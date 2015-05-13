# == Schema Information
#
# Table name: recipes_ingredients
#
#  id            :integer          not null, primary key
#  recipe_id     :integer          not null
#  ingredient_id :integer          not null
#  optional      :boolean          default(FALSE), not null
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#

class RecipesIngredient < ActiveRecord::Base
  validates :recipe, :ingredient, presence: true

  belongs_to :recipe
  belongs_to :ingredient
end
