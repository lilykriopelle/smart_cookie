CookingGenius.Models.Recipe = Backbone.Model.extend({

  urlRoot: 'api/recipes',

  parse: function(response) {

    if (response.intervals) {
      this.intervals = response.intervals;
      delete response.intervals;
    }

    if (response.author) {
      this.author().set(response.author);
      delete response.author;
    }

    if (response.ingredients) {
      this.ingredients().set(response.ingredients, { parse: true });
      delete response.ingredients;
    }

    if (response.annotations) {
      this.annotations().set(response.annotations, { parse: true });
      delete response.annotations;
    }

    // if (response.votes) {
    //   this.votes().set(response.votes, {parse: true});
    //   delete response.votes;
    // }

    return response;
  },

  author: function() {
    if (!this._author) {
      this._author = new Backbone.Model();
    }
    return this._author;
  },

  ingredients: function() {
    if (!this._ingredients) {
      this._ingredients = new CookingGenius.Collections.Ingredients([], {recipe: this});
    }
    return this._ingredients;
  },

  annotations: function() {
    if (!this._annotations) {
      this._annotations = new CookingGenius.Collections.Annotations([], {annotatable: this});
    }
    return this._annotations;
  },

  votes: function() {
    if (!this._votes) {
      this._votes = new CookingGenius.Collections.Votes([], { voteable: this});
    }
    return this._votes;
  },

  toJSON: function(){
    var json = {recipe: _.clone(this.attributes)} ;

    if (this._image) {
      json.recipe.image = this._image;
    }

    return json;
  }

});
