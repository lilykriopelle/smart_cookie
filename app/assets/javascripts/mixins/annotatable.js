CookingGenius.Mixins = (CookingGenius.Mixins || {});

CookingGenius.Mixins.Annotatable = {

  hideAnnotation: function(event) {
    $(".annotation-pop-up").empty();
  },

  popUpAnnotation: function(event) {
    var selection = rangy.getSelection();

    var element = $(event.currentTarget).is("li") ? $(event.currentTarget) : this.$(this.annotatableSelector)

    if (selection.toString().length != 0) {
      var startIdx = selection.getRangeAt(0).startOffset;
      var endIdx = selection.getRangeAt(0).endOffset;

      if (startIdx > endIdx) {
        var tmp = startIdx;
        startIdx = endIdx;
        endIdx = tmp;
      }

      startIdx = this.snapToDelimeters(startIdx, "left", element);
      endIdx = this.snapToDelimeters(endIdx, "right", element);
      this.temporarilyHighlight(startIdx, endIdx, element);

      var annotation = new CookingGenius.Models.Annotation({
        start_idx: startIdx,
        end_idx: endIdx,
        annotatable_id: this.model.id,
        annotatable_type: this.annotatableType,
        author_id: CookingGenius.currentUser.id
      });

      var annotationForm = new CookingGenius.Views.NewAnnotation({
        annotatable: this.model,
        $node: selection.anchorNode,
        $text: $(event.currentTarget),
        model: annotation,
        collection: this.model.annotations()
      });

      $(".annotation-pop-up").empty().html(annotationForm.render().$el);
    } else if (! $(event.target).is("a")) {
        this.renderAnnotations();
    }
  },

  snapToDelimeters: function(index, dir, element) {
    if (dir == "left") {
      i = 0;
      while (!this.isDelimeter($(element).text()[index + i - 1])) {
        i = i - 1;
      }
    } else {
      i = 0;
      while (!this.isDelimeter($(element).text()[index + i])) {
        i = i + 1;
      }
    }
    return index + i;
  },

  isDelimeter(char) {
    return [" ", ",", ".", "!", ";", ":", "\n", undefined].indexOf(char) > -1;
  },

  temporarilyHighlight: function(startIdx, endIdx, element) {
    var selection = element.text().slice(startIdx, endIdx);
    var wrappedSelection = '<span class="temp-highlight">' + selection + "</span>"
    var pre = element.text().slice(0, startIdx);
    var post = element.html().slice(endIdx);
    var newText = pre + wrappedSelection + post;
    element.html(newText);
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
