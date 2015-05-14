CookingGenius.Mixins = (CookingGenius.Mixins || {});

CookingGenius.Mixins.AnnotationPopUp = {

  initialize: function(options) {
    this.annotatable_type = options.annotatable_type;
  },

  annotationPopUp: function() {
    var selection = document.getSelection();
    var startIdx = selection.getRangeAt(0).startOffset;
    var endIdx = selection.getRangeAt(0).endOffset;

    if (selection.toString().length > 0) {
      var annotation = new CookingGenius.Models.Annotation({
        annotatable_id: this.model.id,
        annotatable_type: this.annotatable_type,
        author_id: CookingGenius.currentUser.id
      });

      var annotationForm = new CookingGenius.Views.NewAnnotation({
        model: annotation
      });

      this.parentView.addSubview(".annotation-pop-up", annotationForm);
    }
  }
}
