class ChangeTypeOfSpanIdToBigIntOnAnnotations < ActiveRecord::Migration
  def change
    remove_column :annotations, :span_id, :integer
    add_column :annotations, :span_id, :bigint
  end
end
