class CreateMenus < ActiveRecord::Migration
  def change
    create_table :menus do |t|
      t.string :title, null: false
      t.integer :author_id, null: false

      t.timestamps null: false
    end

    add_index :menus, :author_id
  end
end
