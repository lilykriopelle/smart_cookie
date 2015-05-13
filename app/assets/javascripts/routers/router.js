CookingGenius.Routers.Router = Backbone.Router.extend({

  initialize: function(options) {
    this.$rootEl = options.$rootEl;
    this.listenTo(this.model, "sync", this.render);
  },

  routes: {
    "": "index",
    "users/:id": "showUser",
    "recipes/:id": "showRecipe"
  },

  index: function() {

  },

  showUser: function(id) {
    var user = CookingGenius.users.getOrFetch(id);
    var userShow = new CookingGenius.Views.UserShow({model: user});
    this._swapView(userShow);
  },

  showRecipe: function(id) {
    var recipe = CookingGenius.recipes.getOrFetch(id);
    var recipeShow = new CookingGenius.Views.RecipeShow({model: recipe});
    this._swapView(recipeShow);
  },

  _swapView: function(view) {
    this._currentView && this._currentView.remove();
    this._currentView = view;
    this.$rootEl.html(view.render().$el);
  }

});
