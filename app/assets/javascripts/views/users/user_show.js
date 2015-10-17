CookingGenius.Views.UserShow = Backbone.CompositeView.extend({

  template: JST["users/show"],

  className: "user-show",

  events: {
    "click .display-recipe-form": "displayRecipeForm",
    "click .display-menu-form": "displayMenuForm",
    "click .toggle-user-upvote": "toggleUpvote"
  },

  initialize: function() {
    this.listenTo(this.model, "sync", this.render);
    this.listenTo(this.model.authoredRecipes(), "sync", this.render);
    this.listenTo(this.model.menus(), "sync", this.render);
    this.voteableType = "User";
  },

  displayMenuForm: function() {
    Backbone.history.navigate("#/menus/new", {trigger: true});
  },

  displayRecipeForm: function() {
    Backbone.history.navigate("#/recipes/new", {trigger: true});
  },

  render: function() {
    this.$el.html(this.template({user: this.model}));
    this.model.authoredRecipes().each(function(recipe) {
      var indexItem = new CookingGenius.Views.RecipeFeedItem({model : recipe});
      this.addSubview(".authored-recipes", indexItem);
    }.bind(this));

    this.model.menus().each(function(menu) {
      var indexItem = new CookingGenius.Views.MenuFeedItem({model : menu});
      this.addSubview(".menus", indexItem);
    }.bind(this));

    this.waitAndMasonry();
    return this;
  },

  waitAndMasonry: function() {
		var imageObjects = [];
		var numLoaded = 0;

		var images = this.$el.find('img');
		for (var i = 0; i < images.length; i++) {
			var image = new Image();
			image.onload = function() {
				numLoaded += 1;
			}
			image.src = $(images[i]).attr('src');
			imageObjects.push(image);
		}

		var interval = window.setInterval(function() {
			if (numLoaded == imageObjects.length) {
				this.$el.find('.authored-recipes').masonry({
					isAnimated: true,
					gutter: 10,
					isFitWidth: true,
					itemSelector: '.recipe-feed-item'
				});
				this.$el.find('.recipe-feed-item').show();

        this.$el.find('.menus').masonry({
					isAnimated: true,
					gutter: 10,
					isFitWidth: true,
					itemSelector: '.menu-feed-item'
				});
				window.clearInterval(interval);
			}
		}.bind(this), 20);
	}

});

_.extend(
  CookingGenius.Views.UserShow.prototype,
  CookingGenius.Mixins.Voteable
);
