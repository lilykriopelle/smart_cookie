CookingGenius.Views.RecipeShow = Backbone.CompositeView.extend({

  template: JST["recipes/show"],

  className: "recipe",

  events: {
    "mousedown .instructions" : "stripSpans",
    "mouseup .instructions": "popUpAnnotation",
    "click .delete-recipe": "deleteRecipe",
    "click .annotation": "displayAnnotation"
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

  // TODO abstract into annotatable mixin - ask for help with this.
  popUpAnnotation: function(event) {

    var selection = rangy.getSelection();

    if (selection.toString().length > 0) {
      var endIdx = this.getCaretCharacterOffsetWithin(this.$(".instructions")[0], selection);
      var length = selection.getRangeAt(0).endOffset - selection.getRangeAt(0).startOffset;
      var startIdx = endIdx - length;

      var annotation = new CookingGenius.Models.Annotation({
        start_idx: startIdx,
        end_idx: endIdx,
        annotatable_id: this.model.id,
        annotatable_type: "Recipe",
        author_id: CookingGenius.currentUser.id
      });

      var annotationForm = new CookingGenius.Views.NewAnnotation({
        $node: selection.anchorNode,
        $text: $(event.currentTarget),
        model: annotation,
        collection: this.model.annotations()
      });

      this.addSubview(".annotation-pop-up", annotationForm);
    }
  },

  getCaretCharacterOffsetWithin: function(element, selection) {
    var caretOffset = 0;
    var doc = element.ownerDocument || element.document;
    var win = doc.defaultView || doc.parentWindow;
    if (selection.rangeCount > 0) {
        var range = win.getSelection().getRangeAt(0);
        var preCaretRange = range.cloneRange();
        preCaretRange.selectNodeContents(element);
        preCaretRange.setEnd(range.endContainer, range.endOffset);
        caretOffset = preCaretRange.toString().length;
    }
    return caretOffset;
  },

  displayAnnotation: function(event) {
    event.preventDefault();
    var id = $(event.currentTarget).data("id");
    var annotation = this.model.annotations().getOrFetch(id);
    var showAnnotation = new CookingGenius.Views.AnnotationShow({model: annotation});

    this.subviews(".annotation-pop-up").each(function(subview){
      subview.remove();
    });
    this.addSubview(".annotation-pop-up", showAnnotation);
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
