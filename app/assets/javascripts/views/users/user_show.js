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
    return this;
  }
});

_.extend(
  CookingGenius.Views.UserShow.prototype,
  CookingGenius.Mixins.Voteable
);
