class AddAttachmentImageToAnnotations < ActiveRecord::Migration
  def self.up
    change_table :annotations do |t|
      t.attachment :image
    end
  end

  def self.down
    remove_attachment :annotations, :image
  end
end
