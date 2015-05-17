# == Schema Information
#
# Table name: votes
#
#  id            :integer          not null, primary key
#  voteable_id   :integer          not null
#  voteable_type :string           not null
#  voter_id      :integer          not null
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#

class Vote < ActiveRecord::Base
  validates :voteable_id, :voteable_type, :voter_id, presence: true
  validates :voter_id, uniqueness: { scope: :voteable_id, message: "can only vote once per voteable." }

  belongs_to :voteable, polymorphic: true
end
