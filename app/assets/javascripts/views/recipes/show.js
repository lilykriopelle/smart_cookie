CookingGenius.Views.RecipeShow = Backbone.CompositeView.extend({

  template: JST["recipes/show"],

  className: "recipe",

  events: {
    "mouseup .instructions": "popUpAnnotation",
    "click .delete-recipe": "deleteRecipe"
  },

  initialize: function() {
    this.listenTo(this.model, "sync", this.render);
  },

  deleteRecipe: function() {
    this.model.destroy({
      success: function() {
        Backbone.history.navigate("", { trigger: true });
      }
    });
  },

  popUpAnnotation: function(event) {
    var selection = document.getSelection();
    var startIdx = selection.getRangeAt(0).startOffset;
    var endIdx = selection.getRangeAt(0).endOffset;
    if (selection.toString().length > 0) {
      // Pop up annotation window
    }
  },

  render: function() {
    this.$el.html(this.template({recipe: this.model}));
    this.model.ingredients().each(function(ingredient) {
      var listItem = new CookingGenius.Views.IngredientListItem({
        model: ingredient,
        recipe: this.model
      });
      this.addSubview(".ingredients", listItem);
    }.bind(this));
    return this;
  }

});
