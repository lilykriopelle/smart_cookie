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
  belongs_to :menu
  belongs_to :recipe
end
