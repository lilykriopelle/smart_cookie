CookingGenius.Collections.Annotations = Backbone.Collection.extend({

  url: '/api/annotations',
  model: CookingGenius.Models.Annotation,

  comparator: function(annotation) {
    return -annotation.get("end_idx");
  },

  getOrFetch: function(id) {
    var annotation = this.get(id);
    var annotations = this;

    if (annotation) {
      annotation.fetch();
    } else {
      annotation = new CookingGenius.Models.Annotation({id: id});
      annotation.fetch({
        success: function() {
          annotations.add(annotation);
        }
      });
    }
    return annotation;
  }

});
