CookingGenius.Views.Homepage = Backbone.CompositeView.extend({

  template: JST["homepage"],

  tagName: "main",

  events: {
    "click .tag-nav-link": "displayFilteredRecpies"
  },

  initialize: function() {
    this.displayFilteredRecpies();
  },

  displayFilteredRecpies: function(event) {
    var tag = event ? $(event.currentTarget).text(): "";
    this.$(".recipe-feed-container").empty();
    filtered = new CookingGenius.Collections.Recipes();
    filtered.fetch({
      data: { primary_tag: tag == "all" ? "" : tag},
      success: function() {
        var recipeFeed = new CookingGenius.Views.RecipeFeed({
          collection: filtered,
          primary_tag: tag
        });
        this.addSubview(".recipe-feed-container", recipeFeed);
      }.bind(this)
    });
  },

  render: function() {
    this.$el.html(this.template());
    return this;
  }
});
