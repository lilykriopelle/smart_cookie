CookingGenius.Models.User = Backbone.Model.extend({

  urlRoot: 'api/users',

  parse: function(response) {
    if (response.authored_recipes) {
      this.authoredRecipes().set(response.authored_recipes, { parse: true });
      delete response.authored_recipes;
    }

    if (response.menus) {
      this.menus().set(response.menus, { parse: true });
      delete response.menus;
    }
    return response;
  },

  menus: function() {
    if (!this._menus) {
      this._menus = new CookingGenius.Collections.Menus([], { author: this });
    }

    return this._menus;
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
