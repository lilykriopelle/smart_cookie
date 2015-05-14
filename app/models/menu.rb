# == Schema Information
#
# Table name: menus
#
#  id         :integer          not null, primary key
#  title      :string           not null
#  author_id  :integer          not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Menu < ActiveRecord::Base
  has_many :menus_recipes, class_name: "MenusRecipe"
  has_many :recipes, through: :menus_recipes, source: :recipe
end
