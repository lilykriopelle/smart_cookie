CookingGenius.Models.User = Backbone.Model.extend({

  urlRoot: 'api/users',

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
  },

  votes: function() {
    if (!this._votes) {
      this._votes = new CookingGenius.Collections.Votes([], { voteable: this});
    }
    return this._votes;
  }

});
