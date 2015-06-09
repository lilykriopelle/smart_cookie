CookingGenius.Models.Session = Backbone.Model.extend({
  urlRoot: 'api/session',

  parse: function(response) {
    if (response.authored_recipes) {
      this.authoredRecipes().set(response.authored_recipes, { parse: true });
      delete response.authored_recipes;
    }
    return response;
  },

  authoredRecipes: function() {
    if (!this._authoredRecipes) {
      this._authoredRecipes = new CookingGenius.Collections.Recipes([], { author: this });
    }
    return this._authoredRecipes;
  }

});
