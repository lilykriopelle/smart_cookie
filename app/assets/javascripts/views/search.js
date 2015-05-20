CookingGenius.Views.Search = Backbone.View.extend({

	initialize: function () {
		this.collection = new CookingGenius.Collections.SearchResults();
		this.listenTo(this.collection, "sync", this.renderResults);
	},

	events: {
		"click button": "search",
		"click .next-page": "nextPage"
	},

  className: "search-window",

	template: JST["search"],

	render: function () {
		var content = this.template();
		this.$el.html(content);

		return this;
	},

	search: function (event) {
		event.preventDefault();
		var $input = this.$("#query");
		this.collection.searchInfo.query = $input.val();
		this.collection.searchInfo.page = 1;

		this.collection.fetch({
			data: this.collection.searchInfo
		});
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
			}

			$container.append(view.render().$el);
		});
	},

	nextPage: function () {
		this.collection.searchInfo.page ++;
		this.collection.fetch({
			data: this.collection.searchInfo
		});
	},

	renderSearchInfo: function () {
		this.$("#pages").html(this.collection.searchInfo.totalPages);
	}

});
