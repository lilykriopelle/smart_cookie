CookingGenius.Views.RecipeShow = Backbone.CompositeView.extend({

    template: JST["recipes/show"],

    className: "recipe group",

    events: {
      "mousedown .instructions": "stripHTML",
      "mouseup .instructions": "popUpAnnotation",
      "click .delete-recipe": "deleteRecipe",
      "click .annotationRecipe": "displayAnnotation",
      "click .toggle-recipe-upvote": "toggleUpvote",
      'mouseenter .annotationRecipe': "highlightAnnotationLinks",
      'mouseleave .annotationRecipe': "removeHighlighting",
      "click": "hideAnnotation"
    },

    highLightIngredientAnnotations: function(event) {
      this.eachSubview(function(subview) {
        subview.renderAnnotations();
      });
    },

    initialize: function() {
      this.annotatableSelector = ".instructions";
      this.annotatableType = "Recipe";
      this.voteableType = "Recipe";
      this.listenTo(this.model, "sync", this.render);
      this.listenTo(this.model.annotations(), "add", this.renderAnnotations);
    },

    deleteRecipe: function() {
      this.model.destroy({
        success: function() {
          Backbone.history.navigate("", { trigger: true });
        }
      });
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
      this.renderAnnotations();
      return this;
    }
});

_.extend(
  CookingGenius.Views.RecipeShow.prototype,
  CookingGenius.Mixins.Annotatable,
  CookingGenius.Mixins.Voteable
);
