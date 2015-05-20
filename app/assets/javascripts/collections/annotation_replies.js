CookingGenius.Collections.AnnotationReplies = Backbone.Collection.extend({

  initialize: function(models, options) {
    this.annotation = options.annotation;
  },

  url: function() {
    return '/api/annotations/' + this.annotation.id + '/annotation_replies';
  },

  model: CookingGenius.Models.AnnotationReply

});
