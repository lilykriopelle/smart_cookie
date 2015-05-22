CookingGenius.Views.ReplyShow = Backbone.View.extend({
  tagName: "li",

  className: "group",

  className: "reply-list-item",

  template: JST["replies/show"],

  events: {
    "click .toggle-reply-upvote": "toggleReplyUpvote",
  },

  initialize: function() {
    this.listenTo(this.model, "sync", this.render);
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
      voteable_type: "Reply"
    });

    vote.save({}, {
      success: function() {
        this.model.fetch();
      }.bind(this)
    });
  },

  downvote: function() {
    $.ajax({
      url: '/api/votes/' + this.model.get("vote_id"),
      type: 'DELETE',
      success: function() {
        this.model.fetch();
      }.bind(this)
    });
  }

});
