CookingGenius.Views.Homepage = Backbone.CompositeView.extend({

  template: JST["homepage"],

  tagName: "main",

  events: {
    "click .tag-nav-link": "displayFilteredRecpies",
    "click .search": "search",
    "click #query": "clearText"
  },

  initialize: function() {
    this.displayFilteredRecpies();
  },

  search: function (event) {
		event.preventDefault();
    this.results = new CookingGenius.Collections.SearchResults();
		var $input = this.$("#query");
    this.results.searchInfo.query = $input.val();

    if ($input.val().length > 0 && $input.val() != "search!") {
      this.$(".recipe-feed-container").empty();
      this.results.searchInfo.page = 1;

      this.results.fetch({
  			data: this.results.searchInfo,
        success: function() {
          var searchResults = new CookingGenius.Views.Search({
            collection: this.results
          });
          this.addSubview(".recipe-feed-container", searchResults);
        }.bind(this)
  		});
    }
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

  clearText: function() {
    this.$("#query").val("");
  },

  render: function() {
    this.$el.html(this.template());
    return this;
  }
});
