CookingGenius.Views.RecipeFeed = Backbone.CompositeView.extend({

  template: JST["recipes/feed"],

  tagName: "section",

  className: "recipe-feed",

  initialize: function(options) {
    this.primaryTag = options.primary_tag;
  },

  render: function() {
    this.$el.html(this.template({
      recipes: this.collection,
      primaryTag: this.primaryTag
    }));
    this.collection.each(function(recipe) {
      var recipeFeedItem = new CookingGenius.Views.RecipeFeedItem({
        model: recipe
      });
      this.addSubview(".recipes-feed", recipeFeedItem);
    }.bind(this));
    return this;
  }

});
