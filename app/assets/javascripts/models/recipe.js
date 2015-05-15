CookingGenius.Models.Recipe = Backbone.Model.extend({

  urlRoot: 'api/recipes',

  parse: function(response) {
    if (response.ingredients) {
      this.ingredients().set(response.ingredients, { parse: true });
      delete response.ingredients;
    }

    if (response.annotations) {
      this.annotations().set(response.annotations, { parse: true });
      delete response.annotations;
    }
    return response;
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
  }

});
