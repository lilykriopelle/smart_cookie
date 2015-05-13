# == Schema Information
#
# Table name: ingredients
#
#  id         :integer          not null, primary key
#  name       :string           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Ingredient < ActiveRecord::Base
  validates :name, presence: true
  has_many :recipes_ingredients, class_name: "RecipesIngredient", foreign_key: :ingredient_id
  has_many :recipes, through: :recipes_ingredients, source: :recipe

  before_save :downcase_name

  def downcase_name
    self.name = name.downcase
  end

end
