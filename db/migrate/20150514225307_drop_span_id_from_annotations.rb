class DropSpanIdFromAnnotations < ActiveRecord::Migration
  def change
    remove_column :annotations, :span_id
  end
end
