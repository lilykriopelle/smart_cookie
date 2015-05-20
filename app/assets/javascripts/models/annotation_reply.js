CookingGenius.Models.AnnotationReply = Backbone.Model.extend({

  parse: function(response) {
    if (response.author) {
      this.author().set(response.author);
      delete response.author;
    }

    if (response.votes) {
      this.votes().set(response.votes, { parse: true });
      delete response.votes;
    }

    return response;
  },

  votes: function() {
    if (!this._votes) {
      this._votes = new CookingGenius.Collections.Votes([], { voteable: this});
    }

    return this._votes;
  },

  author: function() {
    if (!this._author) {
      this._author = new Backbone.Model();
    }
    return this._author;
  }

});
