CookingGenius.Views.IngredientListItem = Backbone.CompositeView.extend({

  tagName: "li",

  template: JST["recipes/ingredient_list_item"],

  events: {
    "mousedown": "stripHTML",
    "mouseup": "popUpAnnotation",
    "click .annotationRecipesIngredient": "displayAnnotation",
    'mouseenter .annotationRecipesIngredient': "highlightAnnotationLinks",
    'mouseleave .annotationRecipesIngredient': "removeHighlighting"
  },

  initialize: function(options) {
    this.annotatableSelector = ".ingredient";
    this.annotatableType = "RecipesIngredient";
    this.recipe = options.recipe;
    this.listenTo(this.model, "sync", this.render);
    this.listenTo(this.model.annotations(), "add", this.renderAnnotations);
    this.parentView = options.parentView;
  },

  stripHTML: function(event) {
    if (! $(event.target).is("a")) {
      var $li = $(event.currentTarget)
      $li.html($(event.currentTarget).text());
      $li.siblings().each(function(index, li){
        $(li).html($(li).text());
      })
    }
  },

  render: function() {
    this.$el.html(this.template({ingredient: this.model}));
    this.renderAnnotations();
    return this;
  }

});

_.extend(
  CookingGenius.Views.IngredientListItem.prototype,
  CookingGenius.Mixins.Annotatable
);
