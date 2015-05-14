# == Schema Information
#
# Table name: menus_recipes
#
#  id         :integer          not null, primary key
#  menu_id    :integer          not null
#  recipe_id  :integer          not null
#  ord        :integer          not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

require 'test_helper'

class MenusRecipeTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
