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
      debugger;
    }
  },

  render: function() {
    this.$el.html(this.template({ingredient: this.model}));
    return this;
  }

});
