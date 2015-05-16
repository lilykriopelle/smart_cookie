CookingGenius.Views.Homepage = Backbone.CompositeView.extend({

  template: JST["homepage"],

  tagName: "main",

  events: {
    "click .tag-nav-link": "displayFilteredRecpies"
  },

  displayFilteredRecpies: function(event) {
    this.$(".recipe-feed-container").empty();
    var tag = $(event.currentTarget).text();
    filtered = new CookingGenius.Collections.Recipes();
    filtered.fetch({
      data: {primary_tag: tag},
      success: function() {
        var recipeFeed = new CookingGenius.Views.RecipeFeed({
          collection: filtered,
          primary_tag: tag
        });
        this.addSubview(".recipe-feed-container", recipeFeed);
      }.bind(this)
    });
  },

  initialize: function() {},

  render: function() {
    this.$el.html(this.template());
    return this;
  }
});
