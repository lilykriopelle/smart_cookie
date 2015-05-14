CookingGenius.Views.IngredientListItem = Backbone.View.extend({

  tagName: "li",

  className: "ingredient",

  template: JST["recipes/ingredient_list_item"],

  events: {
    "mouseup": "popUpAnnotation",
  },

  initialize: function(options) {
    this.recipe = options.recipe;
    this.listenTo(this.model, "sync", this.render);
    this.parentView = options.parentView;
  },

  popUpAnnotation: function(event) {
    var selection = document.getSelection();
    var startIdx = selection.getRangeAt(0).startOffset;
    var endIdx = selection.getRangeAt(0).endOffset;

    if (selection.toString().length > 0) {
      var annotation = new CookingGenius.Models.Annotation({
        start_idx: startIdx,
        end_idx: endIdx,
        annotatable_id: this.model.id,
        annotatable_type: "RecipesIngredient",
        author_id: CookingGenius.currentUser.id
      });

      var annotationForm = new CookingGenius.Views.NewAnnotation({
        $text: $(event.currentTarget),
        model: annotation,
        collection: this.model.annotations()
      });

      this.parentView.addSubview(".annotation-pop-up", annotationForm);
    }
  },

  render: function() {
    this.$el.html(this.template({ingredient: this.model}));
    return this;
  }

});
