CookingGenius.Views.RecipeFeedItem = Backbone.View.extend({

  tagName: "li",

  className: "recipe-feed-item",

  template: JST["recipes/feed_item"],

  render: function() {
    this.$el.html(this.template({ recipe: this.model }));
    return this;
  }

});
