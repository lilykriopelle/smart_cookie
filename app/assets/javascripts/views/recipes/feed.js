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

    this.waitAndMasonry();
    return this;
  },

  waitAndMasonry: function() {
    var imageObjects = [];
    var numLoaded = 0;

    var images = this.$el.find('img');
    this.$el.find('.recipe-feed-item').hide();
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
        this.$el.find('.recipe-feed-item').show();
        this.$el.find('.recipes-feed').masonry({
          isAnimated: true,
          gutter: 10,
          isFitWidth: true,
          itemSelector: '.recipe-feed-item'
        });
        window.clearInterval(interval);
      }
    }.bind(this), 100);
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
