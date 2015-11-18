CookingGenius.Mixins = (CookingGenius.Mixins || {});

CookingGenius.Mixins.Annotatable = {

  hideAnnotation: function(event) {
    if (!$(event.target).is('.author a') &&
        !$(event.target).hasClass("annotationRecipe") &&
        !$(event.target).hasClass("annotationRecipesIngredient")) {
      event.preventDefault();
      $(".annotation-pop-up").removeClass("active");
      this.render();
    }
  },

  stripHTML: function(event) {
    if (! $(event.target).is("a")) {
      $(event.currentTarget).html($(event.currentTarget).text());
    }
  },

  popUpAnnotation: function(event) {
    $(".annotation-pop-up").empty();
    $(".annotation-pop-up").addClass("active");
    $(".annotation-pop-up").css('top', $(event.target).offset().top);
    var selection = rangy.getSelection();
    var element = $(event.currentTarget).is("li") ? $(event.currentTarget) : this.$(this.annotatableSelector);

    if (selection.toString().length !== 0) {
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

      annotation.annotatable = this.model;

      var annotationForm = new CookingGenius.Views.NewAnnotation({
        annotatable: this.model,
        annotatable_type: this.annotatableType,
        $node: selection.anchorNode,
        $text: $(event.currentTarget),
        model: annotation,
        collection: this.model.annotations()
      });

      $(".annotation-pop-up").append(annotationForm.render().$el);
    } else if (! $(event.target).is("a")) {
        this.renderAnnotations();
    }
  },

  temporarilyHighlight: function(startIdx, endIdx, element) {
    var selection = element.text().slice(startIdx, endIdx);
    var wrappedSelection = '<span class="temp-highlight">' + selection + "</span>";
    var pre = element.text().slice(0, startIdx);
    var post = element.html().slice(endIdx);
    var newText = '<p class="ingredient">' + pre + wrappedSelection + post + "</p>";
    element.html(newText);
  },

  displayAnnotation: function(event) {
    event.preventDefault();
    $(".annotation-pop-up").empty();
    $(".annotation-pop-up").addClass("active");
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
    var element = this.$(this.annotatableSelector);
    if (element.length === 0) {
      element = $(event.currentTarget);
    }

    var keys = Object.keys(interval),
        indices = JSON.parse(keys),
        startIdx = indices[0],
        endIdx = indices[1],
        selection = element.text().slice(startIdx, endIdx),
        pre = element.text().slice(0, startIdx),
        post = element.html().slice(endIdx);
        newText = pre + this.wrappedSelection(keys, interval, selection) + post;
    return element.html(newText);
  },

  wrappedSelection: function(keys, interval, selection) {
    var className = "annotation" + this.annotatableType, ann_ids = interval[keys[0]];
    return '<a class="' + className + '" href="#" data-ids="[' + ann_ids + ']">' + selection + "</a>";
  },

  removeHighlighting: function() {
    this.$(".annotation" + this.annotatableType).removeClass("active");
    this.$(".annotation" + this.annotatableType).removeClass("opaque");
  },

  highlightAnnotationLinks: function(event) {
    var $link = $(event.currentTarget);
    $link.addClass("active opaque");
    var ids = $link.data("ids");
    var links = $link.siblings();
    for (var i = 0; i < links.length; i ++){
      var link = links.eq(i);
      for (var j = 0; j < ids.length; j++) {
        var id = ids[j];
        if (link.data("ids") && link.data("ids").indexOf(id) > -1) {
          link.addClass("active");
          if (link.data("ids").length > 1) {
            link.addClass("opaque");
          }
        }
      }
    }
  },

  snapToDelimeters: function(index, dir, element) {
    var i = 0;
    if (dir == "left") {
      while (!this.isDelimeter($(element).text()[index + i - 1])) {
        i = i - 1;
      }
    } else {
      while (!this.isDelimeter($(element).text()[index + i])) {
        i = i + 1;
      }
    }
    return index + i;
  },

  isDelimeter: function(char) {
    return [" ", ",", ".", "!", ";", ":", "\n", undefined].indexOf(char) > -1;
  }

};
