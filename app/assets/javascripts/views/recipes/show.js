CookingGenius.Views.RecipeShow = Backbone.CompositeView.extend({

  template: JST["recipes/show"],

  className: "recipe",

  events: {
    "click .delete-recipe": "deleteRecipe"
  },

  initialize: function() {
    this.listenTo(this.model, "sync", this.render);
  },

  deleteRecipe: function() {

  },

  render: function() {
    this.$el.html(this.template({recipe: this.model}));
    this.model.ingredients().each(function(ingredient) {
      debugger;
      var listItem = new CookingGenius.Views.IngredientListItem({model: ingredient});
      this.addSubview(".ingredients", listItem);
    }.bind(this));
    return this;
  }

});
