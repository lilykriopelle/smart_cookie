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

require 'test_helper'

class AnnotationTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
