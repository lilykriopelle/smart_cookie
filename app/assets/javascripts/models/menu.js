CookingGenius.Models.Menu = Backbone.Model.extend({

  urlRoot: 'api/menus',

  parse: function(response) {
    if (response.author) {
      this.author().set(response.author);
      delete response.author;
    }

    if (response.recipes) {
      this.recipes().set(response.recipes, { parse: true });
      delete response.recipes;
    }

    return response;
  },

  recipes: function() {
    if (!this._recipes) {
      this._recipes = new CookingGenius.Collections.Recipes([], {});
    }
    return this._recipes;
  },


  author: function() {
    if (!this._author) {
      this._author = new Backbone.Model();
    }
    return this._author;
  },

  toJSON: function() {
    return { menu: _.clone(this.attributes) };
  }

});
