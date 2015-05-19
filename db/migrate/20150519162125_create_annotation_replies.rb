class CreateAnnotationReplies < ActiveRecord::Migration
  def change
    create_table :annotation_replies do |t|
      t.integer :annotation_id, null: false
      t.integer :author_id, null: false
      t.text :body

      t.timestamps null: false
    end

    add_index :annotation_replies, :annotation_id
    add_index :annotation_replies, :author_id
  end
end
