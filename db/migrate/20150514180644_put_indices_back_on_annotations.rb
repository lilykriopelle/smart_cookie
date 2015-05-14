class PutIndicesBackOnAnnotations < ActiveRecord::Migration
  def change
    add_column :annotations, :start_idx, :integer, null:false
    add_column :annotations, :end_idx, :integer, null:false
  end
end
