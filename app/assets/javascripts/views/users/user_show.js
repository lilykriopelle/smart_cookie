CookingGenius.Views.UserShow = Backbone.CompositeView.extend({

  template: JST["users/show"],

  className: "user-show",

  events: {
    "click .display-recipe-form": "displayRecipeForm"
  },

  initialize: function() {
    this.listenTo(this.model, "sync", this.render);
    this.listenTo(this.model.authoredRecipes(), "sync", this.render);
  },

  displayRecipeForm: function() {
    var recipeForm = new CookingGenius.Views.RecipeForm({
      model: new CookingGenius.Models.Recipe(),
      collection: this.model.authoredRecipes()
    });
    this.addSubview(".new-recipe", recipeForm);
  },

  render: function() {
    this.$el.html(this.template({user: this.model}));
    this.model.authoredRecipes().each(function(recipe) {
      var indexItem = new CookingGenius.Views.AuthoredRecipeIndexItem({model : recipe});
      this.addSubview(".authored-recipes", indexItem);
    }.bind(this));
    return this;
  }

});
