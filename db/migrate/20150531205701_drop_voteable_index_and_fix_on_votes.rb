class DropVoteableIndexAndFixOnVotes < ActiveRecord::Migration
  def change
    remove_index :votes, [:voteable_id, :voter_id]
    add_index :votes, [:voter_id, :voteable_id, :voteable_type], unique: true
  end
end
