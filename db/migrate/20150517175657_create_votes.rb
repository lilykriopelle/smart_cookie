class CreateVotes < ActiveRecord::Migration
  def change
    create_table :votes do |t|
      t.integer :voteable_id, polymorphic: true, null: false
      t.string :voteable_type, null: false
      t.integer :voter_id, null: false
      t.timestamps null: false
    end

    add_index :votes, :voteable_id
    add_index :votes, :voter_id
    add_index :votes, [:voteable_id, :voter_id], unique: true
  end
end
