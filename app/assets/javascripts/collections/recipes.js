CookingGenius.Collections.Recipes = Backbone.Collection.extend({

  url: 'api/recipes',
  model: CookingGenius.Models.Recipe,

  initialize: function(options) {
    this.author = options.author;
  }

});
