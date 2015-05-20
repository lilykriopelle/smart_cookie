CookingGenius.Views.Homepage = Backbone.CompositeView.extend({

  template: JST["homepage"],

  tagName: "main",

  events: {
    "click .tag-nav-link": "displayFilteredRecpies"
  },

  initialize: function() {
    var allRecipes =  new CookingGenius.Collections.Recipes();
    allRecipes.fetch({
      success: function() {
        var recipeFeed = new CookingGenius.Views.RecipeFeed({
          collection: allRecipes,
          primary_tag: "all"
        });
        this.addSubview(".recipe-feed-container", recipeFeed);
      }.bind(this)
    });
  },

  displayFilteredRecpies: function(event) {
    var tag = $(event.currentTarget).text();
    this.$(".recipe-feed-container").empty();
    filtered = new CookingGenius.Collections.Recipes();

    if (tag != "all") {
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
    } else {
      filtered.fetch({
        success: function() {
          var recipeFeed = new CookingGenius.Views.RecipeFeed({
            collection: filtered,
            primary_tag: tag
          });
          this.addSubview(".recipe-feed-container", recipeFeed);
        }.bind(this)
      });
    }
  },


  render: function() {
    this.$el.html(this.template());
    return this;
  }
});
