CookingGenius.Views.RecipeForm = Backbone.View.extend({

  template: JST["recipes/recipe_form"],

  render: function() {
    this.$el.html(this.template());
    return this;
  }

});
