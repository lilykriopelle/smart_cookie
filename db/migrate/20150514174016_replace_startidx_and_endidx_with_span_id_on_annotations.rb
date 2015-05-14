class ReplaceStartidxAndEndidxWithSpanIdOnAnnotations < ActiveRecord::Migration
  def change
    remove_column :annotations, :start_idx
    remove_column :annotations, :end_idx
    add_column :annotations, :span_id, :integer, unique: true
  end
end
