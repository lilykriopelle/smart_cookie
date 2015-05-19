CookingGenius.Views.ReplyShow = Backbone.View.extend({
  tagName: "li",

  className: "reply-list-item",

  template: JST["replies/show"],

  render: function() {
    this.$el.html(this.template({ reply: this.model }));
    return this;
  }
});
