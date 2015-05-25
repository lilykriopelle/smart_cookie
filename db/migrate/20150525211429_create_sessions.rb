class CreateSessions < ActiveRecord::Migration
  def change
    create_table :sessions do |t|
      t.string :session_token, null: false
      t.integer :user_id, null: false

      t.timestamps null: false
    end

    add_index :sessions, :user_id
    add_index :sessions, :session_token, unique: true
    remove_column :users, :session_token
  end
end
