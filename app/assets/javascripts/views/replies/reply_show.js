CookingGenius.Views.ReplyShow = Backbone.View.extend({
  tagName: "li",

  className: "group",

  className: "reply-list-item",

  template: JST["replies/show"],

  events: {
    "click .toggle-reply-upvote": "toggleReplyUpvote",
  },

  initialize: function() {
    this.listenTo(this.model, "change", this.render);
  },

  render: function() {
    this.$el.html(this.template({ reply: this.model }));
    return this;
  },

  toggleReplyUpvote: function() {
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
      voteable_type: "AnnotationReply"
    });

    vote.save({}, {
      success: function() {
        var num_votes = this.model.get("num_votes") + 1;
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
        this.model.set({can_vote: true, vote_id: null, num_votes: num_votes});
      }.bind(this)
    });
  }

});
