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
  },

  popUpAnnotation: function() {
    var selection = document.getSelection();
    var startIdx = selection.getRangeAt(0).startOffset;
    var endIdx = selection.getRangeAt(0).endOffset;
    if (selection.toString().length > 0) {
      // Pop up annotation window
      var annotation = new CookingGenius.Models.Annotation();
      // var annotationForm = new CookingGenius.Views.AnnotationForm({model: annotation});


      var attrs = {
        annotatable_id: this.model.id,
        annotatable_type: "RecipesIngredient",
        start_idx: startIdx,
        end_idx: endIdx,
        body: "test test test",
        author_id: CookingGenius.currentUser.id
      }
      debugger;
    }
  },

  render: function() {
    this.$el.html(this.template({ingredient: this.model}));
    return this;
  }

});
