class Recipe < ActiveRecord::Base
  validates :author_id, :title, :instructions, presence: true
  belongs_to :author, class_name: "User"
end
