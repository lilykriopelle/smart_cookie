# == Schema Information
#
# Table name: annotations
#
#  id               :integer          not null, primary key
#  annotatable_id   :integer          not null
#  author_id        :integer          not null
#  body             :text             not null
#  created_at       :datetime         not null
#  updated_at       :datetime         not null
#  annotatable_type :string
#  span_id          :integer
#  start_idx        :integer          not null
#  end_idx          :integer          not null
#

class Annotation < ActiveRecord::Base
  validates :author_id, :annotatable_id, presence: true
  validates :start_idx, :end_idx, :body, presence: true
  belongs_to :annotatable, polymorphic: true
  belongs_to :author, class_name: "User"
  has_many :votes, as: :voteable
end
