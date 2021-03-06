# == Schema Information
#
# Table name: recipes
#
#  id                 :integer          not null, primary key
#  author_id          :integer          not null
#  title              :string           not null
#  instructions       :text             not null
#  created_at         :datetime         not null
#  updated_at         :datetime         not null
#  primary_tag        :string           not null
#  servings           :integer
#  image_file_name    :string
#  image_content_type :string
#  image_file_size    :integer
#  image_updated_at   :datetime
#

class Recipe < ActiveRecord::Base
  include Annotatable, Voteable, PgSearch

  validates :author_id, :title, :instructions, :servings, :primary_tag, presence: true
  validates :servings, numericality: true

  has_attached_file :image, :styles => { :medium => "300x300>", :thumb => "75x75>" }, :default_url => ":style/missing.png"
  validates_attachment_content_type :image, :content_type => /\Aimage\/.*\Z/

  belongs_to :author, class_name: "User"

  has_many :recipes_ingredients,
            class_name: "RecipesIngredient",
            foreign_key: :recipe_id,
            inverse_of: :recipe,
            dependent: :destroy

  has_many :ingredients, through: :recipes_ingredients, source: :ingredient
  has_many :menus_recipes, class_name: "MenusRecipe"
  has_many :menus, through: :menus_recipes, source: :menu

  scope :primary_tag, -> (tag) { where primary_tag: tag }
  scope :author_id, -> (id) { where author_id: id }

  multisearchable against: :title
  pg_search_scope :ingredient_search,
                  associated_against: { ingredients: :name },
                  using: { :tsearch => { prefix: true } }

  TAGS = %w(appetizer entree side sandwich soup salad drink cake cookie pie)

end
