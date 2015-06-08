CookingGenius.Views.CreateMenu = Backbone.CompositeView.extend({

  events: {
    "click .minimize-menu": "minimize",
    "click .search-button": "search",
    "mouseenter .recipe-feed-item": "makeDraggable",
    "click .menu-button": "submit"
  },

  className: "menu-form group",

  template: JST["menus/new"],

  minimize: function() {
    this.remove();
  },

  search: function (event) {
		event.preventDefault();
    this.results = new CookingGenius.Collections.SearchResults();
		var $input = this.$("#query");
    this.results.searchInfo.query = $input.val();
    if ($input.val().length > 0 && $input.val() != "search!") {
      this.$(".recipes").empty();
      this.results.searchInfo.page = 1;
      this.results.searchInfo.only_recipes = true;
      this.results.fetch({
  			data: this.results.searchInfo,
        success: function() {
          var searchResults = new CookingGenius.Views.Search({
            collection: this.results
          });
          this.addSubview(".recipes", searchResults);
        }.bind(this)
  		});
    }
	},

  submit: function() {
    var attrs = {};
    attrs.title = this.$(".menu-title").val();
    attrs.recipes = {};
    this.$(".menus-recipes li").each(function(ord, recipe){
      var recipeID = $(recipe).attr("id");
      attrs.recipes[ord] = {
        ord: ord,
        recipe_id: recipeID
      };
    }.bind(this));
    this.model.save(attrs, {
      success: function() {
        this.remove();
      }.bind(this),
      error: function(model, response) {
        // TODO - render erors
      }
    });
  },

  makeDraggable: function(event) {
    $(event.currentTarget).draggable({
      connectToSortable: ".droppable",
      revert: "invalid"
    });
    this.$("#search-results").droppable();
    this.$("#search-results").sortable();
  },

  render: function() {
    this.$el.html(this.template({ menu: this.model }));
    return this;
  }

});
