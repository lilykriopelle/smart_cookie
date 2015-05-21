CookingGenius.Views.Homepage = Backbone.CompositeView.extend({

  template: JST["homepage"],

  tagName: "main",

  events: {
    "click .tag-nav-link": "displayFilteredRecpies",
    "blur #query": "replacePrompt",
    "click .search": "search",
    "keypress #query": "searchIfEnter",
    "click #query": "clearPrompt"
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

  searchIfEnter: function(event) {
    if (event.charCode == 13) {
      this.search(event);
    }
  },

  clearPrompt: function() {
    this.$("#query").val("");
  },

  replacePrompt: function() {
    // this.$("#query").val("search!");
  },

  render: function() {
    this.$el.html(this.template());
    return this;
  }
});
