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
    this.$(".new-menu").empty();
    var menuForm = new CookingGenius.Views.CreateMenu({
      model: new CookingGenius.Models.Menu(),
      collection: this.model.menus()
    });
    this.addSubview(".new-menu", menuForm);
    this.$(".sortable").sortable();
    this.$(".draggable").draggable();
  },

  displayRecipeForm: function() {
    this.$(".new-recipe").empty();
    var recipeForm = new CookingGenius.Views.RecipeForm({
      model: new CookingGenius.Models.Recipe(),
      collection: this.model.authoredRecipes()
    });
    this.addSubview(".new-recipe", recipeForm);
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
    return this;
  }
});

_.extend(
  CookingGenius.Views.UserShow.prototype,
  CookingGenius.Mixins.Voteable
);
