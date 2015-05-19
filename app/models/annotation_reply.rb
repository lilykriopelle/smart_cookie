# == Schema Information
#
# Table name: annotation_replies
#
#  id            :integer          not null, primary key
#  annotation_id :integer          not null
#  author_id     :integer          not null
#  body          :text             not null
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#

class AnnotationReply < ActiveRecord::Base
  include Voteable

  validates :annotation_id, :author_id, :body, presence: true
  validates :body, length: { minimum: 1 }

  belongs_to :annotation
  belongs_to :author, class_name: "User"
end
