CookingGenius.Models.Recipe = Backbone.Model.extend({

  urlRoot: 'api/recipes',

  parse: function(response) {
    if (response.recipes_ingredients) {
      this.ingredients().set(response.recipes_ingredients, { parse: true });
      delete response.recipes_ingredients
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
