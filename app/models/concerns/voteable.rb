module Voteable
  extend ActiveSupport::Concern

  included do
    has_many :votes, as: :voteable, dependent: :destroy
  end

  def can_vote(user)
    if user
      !(self.is_a?(User) && self.id == user.id) && votes.find_by({voter_id: user.id}).nil?
    else
      false
    end
  end

  def vote_id(user)
    if user
      votes.find_by({voter_id: user.id}).id if votes.find_by({voter_id: user.id})
    end
  end

end
