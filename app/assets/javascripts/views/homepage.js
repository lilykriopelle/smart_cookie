CookingGenius.Views.Homepage = Backbone.CompositeView.extend({

  template: JST["homepage"],

  tagName: "main",

  events: {
    "click .tag-nav-link": "displayFilteredRecpies",
    "click .open-search": "search"
  },

  initialize: function() {
    this.displayFilteredRecpies();
  },

  search: function (event) {
		event.preventDefault();
    this.$(".recipe-feed-container").empty();
    var results = new CookingGenius.Collections.SearchResults();
		var $input = this.$("#query");
    results.searchInfo.query = $input.val();
    results.searchInfo.page = 1;

    results.fetch({
			data: results.searchInfo,
      success: function() {
        var searchResults = new CookingGenius.Views.Search({
          collection: results
        });
        this.addSubview(".recipe-feed-container", searchResults);
      }.bind(this)
		});
	},

  displayFilteredRecpies: function(event) {
    var tag = event ? $(event.currentTarget).text(): "all";
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
