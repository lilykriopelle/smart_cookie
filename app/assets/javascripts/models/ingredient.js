CookingGenius.Models.Ingredient = Backbone.Model.extend({
  url: 'api/ingredients',

  model: CookingGenius.Models.Ingredient,

  parse: function(response) {
    if (response.annotations) {
      this.annotations().set(response.annotations, { parse: true });
      delete response.annotations;
    }

    if (response.intervals) {
      this.intervals = response.intervals;
      delete response.intervals;
    }

    // debugger;
    return response;
  },

  annotations: function() {
    if (!this._annotations) {
      this._annotations = new CookingGenius.Collections.Annotations([], {annotatable: this});
    }

    return this._annotations;
  }

});
