CookingGenius.Collections.Recipes = Backbone.Collection.extend({

  url: 'api/recipes',

  model: CookingGenius.Models.Recipe,

  initialize: function(options) {},

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
    return recipe.votes().length;
  }

});

CookingGenius.recipes = new CookingGenius.Collections.Recipes();
