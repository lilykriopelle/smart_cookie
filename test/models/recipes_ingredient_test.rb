# == Schema Information
#
# Table name: recipes_ingredients
#
#  id            :integer          not null, primary key
#  ingredient_id :integer          not null
#  optional      :boolean          default(FALSE), not null
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#  quantity      :float            not null
#  unit          :string           not null
#  recipe_id     :integer
#

require 'test_helper'

class RecipesIngredientTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
