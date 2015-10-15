CookingGenius.Views.RecipeFeedItem = Backbone.View.extend({

  tagName: "li",

  className: "recipe-feed-item group",

  template: JST["recipes/feed_item"],

  attributes : function () {
    return {
      id : this.model.id
    };
  },

  render: function() {
    this.$el.html(this.template({ recipe: this.model }));
    return this;
  }

});
