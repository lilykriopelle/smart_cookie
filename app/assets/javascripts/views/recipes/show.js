CookingGenius.Views.RecipeShow = Backbone.CompositeView.extend({

    template: JST["recipes/show"],

    className: "recipe group",

    events: {
      "mousedown .instructions": "stripHTML",
      "mouseup .instructions": "popUpAnnotation",
      "click .delete-recipe": "deleteRecipe",
      "click .annotationRecipe": "displayAnnotation",
      "click .minimize-annotation": "hideAnnotation",
      "click .toggle-recipe-upvote": "toggleRecipeUpvote",
      'mouseenter .annotationRecipe': "highlightAnnotationLinks",
      'mouseleave .annotationRecipe': "removeHighlighting",
      'mouseup .ingredients': "highLightIngredientAnnotations"
    },

    highLightIngredientAnnotations: function(event) {
      this.eachSubview(function(subview) {
        subview.renderAnnotations();
      });
    },

    initialize: function() {
      this.annotatableSelector = ".instructions";
      this.annotatableType = "Recipe";
      this.listenTo(this.model, "sync", this.render);
      this.listenTo(this.model.annotations(), "add", this.renderAnnotations);
      this.listenTo(this.model.votes(), "add remove", this.render);
    },

    stripHTML: function(event) {
      if (! $(event.target).is("a")) {
        $(event.currentTarget).html(this.model.get("instructions"));
      }
    },

    deleteRecipe: function() {
      this.model.destroy({
        success: function() {
          Backbone.history.navigate("", { trigger: true });
        }
      });
    },

    toggleRecipeUpvote: function() {
      vote = this.model.votes().where({voter_id: CookingGenius.currentUser.id});
      if (vote[0]) {
        vote[0].destroy();
      } else {
        var vote = new CookingGenius.Models.Vote({
          voter_id: CookingGenius.currentUser.id,
          voteable_id: this.model.id,
          voteable_type: "Recipe"
        });

        vote.save({}, {
          success: function() {
            this.model.votes().add(vote);
          }.bind(this)
        });
      }
    },

    upvoteRecipe: function(event) {
      event.preventDefault();
      var vote = new CookingGenius.Models.Vote({
        voter_id: CookingGenius.currentUser.id,
        voteable_id: this.model.id,
        voteable_type: "Recipe"
      });

      vote.save({}, {
        success: function() {
          this.model.votes().add(vote);
        }.bind(this)
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
  CookingGenius.Mixins.Annotatable
);
