CookingGenius.Views.ReplyShow = Backbone.View.extend({
  tagName: "li",

  className: "group",

  className: "reply-list-item",

  template: JST["replies/show"],

  events: {
    "click .toggle-reply-upvote": "toggleReplyUpvote",
  },

  initialize: function() {
    this.listenTo(this.model.votes(), "add remove", this.render);
  },

  render: function() {
    this.$el.html(this.template({ reply: this.model }));
    return this;
  },

  toggleReplyUpvote: function() {
    vote = this.model.votes().where({voter_id: CookingGenius.currentUser.id});
    if (vote[0]) {
      vote[0].destroy();
    } else {
      var vote = new CookingGenius.Models.Vote({
        voter_id: CookingGenius.currentUser.id,
        voteable_id: this.model.id,
        voteable_type: "AnnotationReply"
      });

      vote.save({}, {
        success: function() {
          this.model.votes().add(vote);
        }.bind(this)
      });
    }
  }
});
