class AddAnnotatableTypeToAnnotations < ActiveRecord::Migration
  def change
    add_column :annotations, :annotatable_type, :string
  end
end
