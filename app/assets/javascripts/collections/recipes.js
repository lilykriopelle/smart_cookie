CookingGenius.Collections.Recipes = Backbone.Collection.extend({

  url: 'api/recipes',

  model: CookingGenius.Models.Recipe,

  initialize: function(options) {},

  parse: function(response) {
    if (response.total_pages) {
      this.totalPages = response.total_pages;
      delete response.total_pages;
      return response.recipes;
    }
    return response;
  },

  getOrFetch: function(id) {
    var recipe = this.get(id);
    var recipes = this;

    if (recipe) {
      recipe.fetch();
    } else {
      recipe = new CookingGenius.Models.Recipe({id: id});
      recipe.fetch({
        success: function() {
          recipes.add(recipe);
        }
      });
    }
    return recipe;
  },

  comparator: function(recipe) {
    return recipe.num_votes;
  }

});

CookingGenius.recipes = new CookingGenius.Collections.Recipes();
