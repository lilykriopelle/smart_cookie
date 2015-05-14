class CreateAnnotations < ActiveRecord::Migration
  def change
    create_table :annotations do |t|
      t.integer :annotatable_id
      t.integer :author_id
      t.integer :start_idx
      t.integer :end_idx
      t.text    :body

      t.timestamps null: false
    end

    add_index :annotations, :annotatable_id
    add_index :annotations, :author_id
  end
end
