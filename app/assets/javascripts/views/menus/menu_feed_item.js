CookingGenius.Views.MenuFeedItem = Backbone.View.extend({

  tagName: "li",

  className: "menu-feed-item",

  template: JST["menus/feed_item"],

  render: function() {
    this.$el.html(this.template({ menu: this.model }));
    return this;
  }

});
