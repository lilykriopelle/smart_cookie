CookingGenius.Models.Ingredient = Backbone.Model.extend({
  url: 'api/ingredients',

  model: CookingGenius.Models.Ingredient,

  parse: function(response) {
    debugger;
    if (response.ingredient) {
      this.name = response.ingredient.name;
      delete response.ingredient;
    }

    return response
  }
});
