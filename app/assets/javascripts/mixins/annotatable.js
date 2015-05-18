CookingGenius.Mixins = (CookingGenius.Mixins || {});

CookingGenius.Mixins.Annotatable = {

  hideAnnotation: function(event) {
    $(".annotation-pop-up").empty();
  },

  popUpAnnotation: function(event) {
    var selection = rangy.getSelection();

    var domEl;
    if (this.annotatableType == "RecipesIngredient") {
      domEl = event.currentTarget;
    } else {
      domEl = this.$(this.annotatableSelector)[0];
    }

    if (selection.toString().length != 0) {
      var endIdx = this.getCaretCharacterOffsetWithin(domEl, selection);
      var length = selection.getRangeAt(0).endOffset - selection.getRangeAt(0).startOffset;
      var startIdx = endIdx - length;

      if (startIdx > endIdx) {
        var tmp = startIdx;
        startIdx = endIdx;
        endIdx = tmp;
      }

      var annotation = new CookingGenius.Models.Annotation({
        start_idx: startIdx,
        end_idx: endIdx,
        annotatable_id: this.model.id,
        annotatable_type: this.annotatableType,
        author_id: CookingGenius.currentUser.id
      });

      var annotationForm = new CookingGenius.Views.NewAnnotation({
        $node: selection.anchorNode,
        $text: $(event.currentTarget),
        model: annotation,
        collection: this.model.annotations()
      });

      $(".annotation-pop-up").empty().html(annotationForm.render().$el);
    }
  },

  displayAnnotation: function(event) {
    event.preventDefault();
    var id = $(event.currentTarget).data("id");
    var annotation = this.model.annotations().get(id);
    var showAnnotation = new CookingGenius.Views.AnnotationShow({
      model: annotation
    });

    $(".annotation-pop-up").empty().html(showAnnotation.render().$el);
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

  renderAnnotations: function() {
    var annotations = this.model.annotations();
    annotations.sort();
    annotations.each(this.wrapAnnotationInLink.bind(this));
  },

  wrapAnnotationInLink: function(annotation) {
    var start = annotation.get("start_idx");
    var end = annotation.get("end_idx");
    var selection = this.$(this.annotatableSelector).text().slice(start, end);
    var className = "annotation" + this.annotatableType;
    var wrappedSelection = '<a class="' + className + '" href="#" data-id="' + annotation.id + '">' + selection + "</a>"
    var pre = this.$(this.annotatableSelector).text().slice(0, start);
    var post = this.$(this.annotatableSelector).html().slice(end);
    var newText = pre + wrappedSelection + post;
    this.$(this.annotatableSelector).html(newText);
  }

}
