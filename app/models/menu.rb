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
  include Voteable

  validates :author_id, :title, presence: true

  belongs_to :author, class_name: "User"
  has_many :menus_recipes, class_name: "MenusRecipe", inverse_of: :menu
  has_many :recipes, through: :menus_recipes, source: :recipe
end
