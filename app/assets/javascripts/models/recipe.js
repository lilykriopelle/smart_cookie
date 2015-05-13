CookingGenius.Models.Recipe = Backbone.Model.extend({

  urlRoot: 'api/recipes',

  parse: function(response) {
    if (response.ingredients) {
      this.ingredients().set(response.ingredients, { parse: true });
      delete response.ingredients
    }
    return response;
  },

  ingredients: function() {
    if (!this._ingredients) {
      this._ingredients = new CookingGenius.Collections.Ingredients([], {recipe: this});
    }

    return this._ingredients;
  }

});
