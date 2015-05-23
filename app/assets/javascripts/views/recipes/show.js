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
      'mouseleave .annotationRecipe': "removeHighlighting"
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
      if (this.model.get("can_vote") == true) {
        this.upvote();
      } else {
        this.downvote();
      }
    },

    upvote: function() {
      var vote = new CookingGenius.Models.Vote({
        voter_id: CookingGenius.currentUser.id,
        voteable_id: this.model.id,
        voteable_type: "Recipe"
      });

      vote.save({}, {
        success: function() {
          var num_votes = this.model.get("num_votes") + 1;
          this.$(".num-votes").html(num_votes);
          this.model.set({can_vote: false, vote_id: vote.id, num_votes: num_votes});
        }.bind(this)
      });
    },

    downvote: function() {
      $.ajax({
        url: '/api/votes/' + this.model.get("vote_id"),
        type: 'DELETE',
        success: function() {
          var num_votes = this.model.get("num_votes") - 1;
          this.$(".num-votes").html(num_votes);
          this.model.set({can_vote: true, vote_id: null, num_votes: num_votes});
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
      this.$(".annotation-pop-up").draggable();
      return this;
    }
});

_.extend(
  CookingGenius.Views.RecipeShow.prototype,
  CookingGenius.Mixins.Annotatable
);
