CookingGenius.Views.RecipeShow = Backbone.CompositeView.extend({

  template: JST["recipes/show"],

  className: "recipe",

  events: {
    "mousedown .instructions" : "stripSpans",
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
    var selection = rangy.getSelection();
    var startIdx = selection.anchorOffset;
    var endIdx = selection.focusOffset;

    if (selection.toString().length > 0) {
      var annotation = new CookingGenius.Models.Annotation({
        start_idx: startIdx,
        end_idx: endIdx,
        annotatable_id: this.model.id,
        annotatable_type: "Recipe",
        author_id: CookingGenius.currentUser.id
      });

      var annotationForm = new CookingGenius.Views.NewAnnotation({
        $text: $(event.currentTarget),
        model: annotation,
        collection: this.model.annotations()
      });

      this.addSubview(".annotation-pop-up", annotationForm);
    }
  },

  render: function() {
    this.$el.html(this.template({recipe: this.model}));
    this.model.ingredients().each(function(ingredient) {
      var listItem = new CookingGenius.Views.IngredientListItem({
        model: ingredient,
        recipe: this.model,
        parentView: this
      });
      this.addSubview(".ingredients", listItem);
    }.bind(this));
    return this;
  }

});
