CookingGenius.Mixins = (CookingGenius.Mixins || {});

CookingGenius.Mixins.Voteable = {
  toggleUpvote: function() {
    if (CookingGenius.currentUser.id == null) {
      return;
    }
    if (this.model.get("can_vote") == true) {
      this.upvote();
    } else {
      this.downvote();
    }
  },

  upvote: function() {
    var vote = new CookingGenius.Models.Vote({
      voter_id: CookingGenius.currentUser.id,
      voteable_id: this.model.id,
      voteable_type: this.voteableType
    });

    vote.save({}, {
      success: function() {
        var num_votes = this.model.get("num_votes") + 1;
        this.$(".num-votes").html(num_votes);
        this.model.set({can_vote: false, vote_id: vote.id, num_votes: num_votes});
      }.bind(this)
    });
  },

  downvote: function() {
    $.ajax({
      url: '/api/votes/' + this.model.get("vote_id"),
      type: 'DELETE',
      success: function() {
        var num_votes = this.model.get("num_votes") - 1;
        this.$(".num-votes").html(num_votes);
        this.model.set({can_vote: true, vote_id: null, num_votes: num_votes});
      }.bind(this)
    });
  }
};
