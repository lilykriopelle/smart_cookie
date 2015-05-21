CookingGenius.Views.RecipeFeed = Backbone.CompositeView.extend({

  template: JST["recipes/feed"],

  tagName: "section",

  className: "recipe-feed",

  events: {
    "click .next-page": "nextPage",
    "click .previous-page": "previousPage"
  },

  initialize: function(options) {
    this.primaryTag = options.primary_tag;
    this.page = options.page;
    this.listenTo(this.collection, "sync", this.render);
  },

  render: function() {
    this.$(".recipe-feed").empty();
    this.$el.html(this.template({
      page: this.page,
      totalPages: this.collection.totalPages,
      recipes: this.collection,
      primaryTag: this.primaryTag
    }));

    this.collection.each(function(recipe) {
      if (recipe.id !== undefined) {
        var recipeFeedItem = new CookingGenius.Views.RecipeFeedItem({
          model: recipe
        });
        this.addSubview(".recipes-feed", recipeFeedItem);
      }
    }.bind(this));
    return this;
  },

  previousPage: function() {
    this.changePage(-1);
  },

  nextPage: function () {
    this.changePage(1);
  },

  changePage: function(dir) {
    this.page = this.page + dir;
		this.collection.fetch({
			data: {
        primary_tag: this.primaryTag == "all" ? "" : this.primaryTag,
        page: this.page
      }
		});
  },

});
