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

require 'test_helper'

class AnnotationTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
