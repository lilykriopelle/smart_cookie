# == Schema Information
#
# Table name: annotation_replies
#
#  id            :integer          not null, primary key
#  annotation_id :integer          not null
#  author_id     :integer          not null
#  body          :text
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#

class AnnotationReply < ActiveRecord::Base
end
