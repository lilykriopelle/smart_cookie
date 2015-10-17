CookingGenius.Views.Search = Backbone.View.extend({

	initialize: function () {
		this.listenTo(this.collection, "sync", this.render);
	},

	events: {
		"click .next-page": "nextPage",
		"click .previous-page": "previousPage"
	},

  className: "search-window",

	template: JST["search"],

	render: function () {
		this.collection.sort();
		var content = this.template({
			page: this.collection.searchInfo.page,
			totalPages: this.collection.searchInfo.totalPages
		});
		this.$el.html(content);
		this.renderResults();
		return this;
	},

	renderResults: function () {
		this.renderSearchInfo();
		var $container = this.$("#search-results");
		$container.empty();

		var view;
		this.collection.each(function (result) {
			if (result instanceof CookingGenius.Models.User) {
				view = new CookingGenius.Views.UserListItem({ model: result });
			} else if (result instanceof CookingGenius.Models.Recipe) {
				view = new CookingGenius.Views.RecipeFeedItem({ model: result });
			} else if (result instanceof CookingGenius.Models.Menu) {
				view = new CookingGenius.Views.MenuFeedItem({model: result});
			}
			this.waitAndMasonry();
			$container.append(view.render().$el);
		}.bind(this));
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
				this.$el.find('.recipes-feed').masonry({
					isAnimated: true,
					gutter: 10,
					isFitWidth: true,
					itemSelector: '.recipe-feed-item'
				});
				this.$el.find('.recipe-feed-item').show();
				window.clearInterval(interval);
			}
		}.bind(this), 20);
	},

	previousPage: function() {
		this.changePage(-1);
	},

	nextPage: function () {
		this.changePage(1);
	},

	changePage: function(dir) {
		this.collection.searchInfo.page = this.collection.searchInfo.page + dir;
		this.collection.fetch({
			data: this.collection.searchInfo
		});
	},

	renderSearchInfo: function () {
		this.$("#pages").html(this.collection.searchInfo.totalPages);
	}

});
