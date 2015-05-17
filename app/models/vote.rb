class Vote < ActiveRecord::Base
  validates :voteable_id, :voteable_type, :voter_id, presence: true
  validates :voter_id, uniqueness: { scope: :voteable_id, message: "can only vote once per voteable." }

  belongs_to :voteable, polymorphic: true
end
