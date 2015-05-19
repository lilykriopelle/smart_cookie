CookingGenius.Models.AnnotationReply = Backbone.Model.extend({

  parse: function(response) {
    if (response.author) {
      this.author().set(response.author);
      delete response.author;
    }
    return response;
  },

  author: function() {
    if (!this._author) {
      this._author = new Backbone.Model();
    }
    return this._author;
  }

});
