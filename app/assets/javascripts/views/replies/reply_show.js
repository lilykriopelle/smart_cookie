CookingGenius.Views.ReplyShow = Backbone.View.extend({
  tagName: "li",
  className: "reply-list-item group",
  template: JST["replies/show"],

  events: {
    "click .toggle-reply-upvote": "toggleUpvote",
  },

  initialize: function() {
    this.voteableType = "AnnotationReply"
  },

  render: function() {
    this.$el.html(this.template({ reply: this.model }));
    return this;
  }
});

_.extend(
  CookingGenius.Views.ReplyShow.prototype,
  CookingGenius.Mixins.Voteable
);
