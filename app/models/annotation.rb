# == Schema Information
#
# Table name: annotations
#
#  id                 :integer          not null, primary key
#  annotatable_id     :integer          not null
#  author_id          :integer          not null
#  body               :text             not null
#  created_at         :datetime         not null
#  updated_at         :datetime         not null
#  annotatable_type   :string
#  start_idx          :integer          not null
#  end_idx            :integer          not null
#  image_file_name    :string
#  image_content_type :string
#  image_file_size    :integer
#  image_updated_at   :datetime
#

class Annotation < ActiveRecord::Base
  include Voteable

  validates :author_id, :annotatable_id, presence: true
  validates :start_idx, :end_idx, :body, presence: true
  belongs_to :annotatable, polymorphic: true
  belongs_to :author, class_name: "User"
  has_many :replies, class_name: "AnnotationReply", dependent: :destroy

  has_attached_file :image, styles: { :thumb => "100x100>" }
  validates_attachment_content_type :image, :content_type => /\Aimage\/.*\Z/

end
