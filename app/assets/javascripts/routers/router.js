CookingGenius.Routers.Router = Backbone.Router.extend({

  initialize: function(options) {
    this.$rootEl = options.$rootEl;
    this.listenTo(this.model, "sync", this.render);
  },

  routes: {
    "": "homepage",
    "users/:id": "showUser",
    "recipes/new": "newRecipe",
    "recipes/:id": "showRecipe",
    "menus/new": "newMenu",
    "menus/:id": "showMenu"
  },

  homepage: function() {
    var homePage = new CookingGenius.Views.Homepage();
    this._swapView(homePage);
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

  newMenu: function() {
    var menuForm = new CookingGenius.Views.CreateMenu({
      model: new CookingGenius.Models.Menu()
    });
    this._swapView(menuForm);
    menuForm.$(".sortable").sortable();
    menuForm.$(".draggable").draggable();
  },

  newRecipe: function() {
    var recipeForm = new CookingGenius.Views.RecipeForm({
      model: new CookingGenius.Models.Recipe(),
      collection: CookingGenius.currentUser.authoredRecipes()
    });
    this._swapView(recipeForm);
    // this.addSubview(".new-recipe", recipeForm);
  },

  showMenu: function(id) {
    var menu = CookingGenius.menus.getOrFetch(id);
    var menuShow = new CookingGenius.Views.MenuShow({model: menu});
    this._swapView(menuShow);
  },

  _swapView: function(view) {
    this._currentView && this._currentView.remove();
    this._currentView = view;
    this.$rootEl.html(view.render().$el);
  }

});
