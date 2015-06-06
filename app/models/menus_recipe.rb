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

class MenusRecipe < ActiveRecord::Base
  validates :menu, :recipe, :ord, presence: true

  belongs_to :menu, inverse_of: :menus_recipes
  belongs_to :recipe
end
