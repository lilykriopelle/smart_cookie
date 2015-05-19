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
    $(".annotation-pop-up").empty();
    var ids = $(event.currentTarget).data("ids");
    for (var i = 0; i < ids.length; i++) {
      var annotation = this.model.annotations().get(ids[i]);
      var showAnnotation = new CookingGenius.Views.AnnotationShow({
        model: annotation
      });
      $(".annotation-pop-up").append(showAnnotation.render().$el);
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

  renderAnnotations: function() {
    var intervals = this.model.intervals || [];
    for (var i = intervals.length - 1; i >= 0; i--) {
      var interval = intervals[i];
      this.wrapIntervalInLink(interval);
    }
  },

  wrapIntervalInLink: function(interval) {
    var indices = JSON.parse(Object.keys(interval));
    var startIdx = indices[0], endIdx = indices[1];
    var selection = this.$(this.annotatableSelector).text().slice(startIdx, endIdx);
    var className = "annotation" + this.annotatableType;
    var keys = Object.keys(interval);
    var ann_ids = interval[keys[0]];
    var wrappedSelection = '<a class="' + className + '" href="#" data-ids="[' + ann_ids + ']">' + selection + "</a>"
    var pre = this.$(this.annotatableSelector).text().slice(0, startIdx);
    var post = this.$(this.annotatableSelector).html().slice(endIdx);
    var newText = pre + wrappedSelection + post;
    this.$(this.annotatableSelector).html(newText);
  },

  removeHighlighting: function() {
    this.$(".annotation" + this.annotatableType).removeClass("active");
  },

  highlightAnnotationLinks: function(event) {
    var $link = $(event.currentTarget)
    $link.addClass("active");
    var ids = $link.data("ids");
    var links = $link.siblings();
    for (var i = 0; i < links.length; i ++){
      var link = links.eq(i);
      for (var j = 0; j < ids.length; j++) {
        var id = ids[j];
        if (link.data("ids").indexOf(id) > -1) {
          link.addClass("active");
        }
      }
    }
  }

}
