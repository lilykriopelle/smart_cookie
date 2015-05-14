class Annotation < ActiveRecord::Base
  validates :author_id, :annotatable_id, presence: true
  validates :start_idx, :end_idx, :body, presence: true

  belongs_to :annotatable, polymorphic: true

end
