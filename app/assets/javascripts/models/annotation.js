CookingGenius.Models.Annotation = Backbone.Model.extend({

  urlRoot: '/api/annotations',

  parse: function(response) {
    if (response.author) {
      this.author().set(response.author);
      delete response.author;
    }

    if (response.votes) {
      this.votes().set(response.votes, { parse: true });
      delete response.votes;
    }

    if (response.replies) {
      this.replies().set(response.replies);
      delete response.replies;
    }

    return response;
  },


  author: function() {
    if (!this._author) {
      this._author = new Backbone.Model();
    }
    return this._author;
  },

  votes: function() {
    if (!this._votes) {
      this._votes = new CookingGenius.Collections.Votes([], { voteable: this});
    }

    return this._votes;
  },

  replies: function() {

    if (!this._replies) {
      this._replies = new CookingGenius.Collections.AnnotationReplies([], {annotation: this});
    }

    return this._replies;
  }

});
