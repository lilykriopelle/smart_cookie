module Annotatable
  extend ActiveSupport::Concern

  included do
    has_many :annotations, as: :annotatable
  end

  def intervals_hash
    endpoints = generate_endpoint_list

    intervals = []
    active_annotation_ids = []

    endpoints.each_with_index do |endpoint, index|
      if (active_annotation_ids.size > 0)
        start_idx = endpoints[index - 1].index
        end_idx = endpoint.index
        if end_idx - start_idx > 0
          intervals.push({ [start_idx, end_idx] => active_annotation_ids.dup })
        end
      end

      if (endpoint.start)
        active_annotation_ids.push(endpoint.annotation_id)
      else
        active_annotation_ids.delete(endpoint.annotation_id)
      end
    end

    intervals
  end

  def generate_endpoint_list
    endpoints = [];
    self.annotations.each do |annotation|
      endpoints.push(Endpoint.new({
        annotation_id: annotation.id,
        index: annotation.start_idx,
        start: true
      }));

      endpoints.push(Endpoint.new({
        annotation_id: annotation.id,
        index: annotation.end_idx,
        start: false
      }));
    end

    endpoints.sort_by { |endpoint| endpoint.index }
  end
end

class Endpoint
  attr_accessor :annotation_id, :index, :start

  def initialize(options)
    self.annotation_id = options[:annotation_id]
    self.index = options[:index]
    self.start = options[:start]
  end

end
