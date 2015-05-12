CookingGenius.Views.NewIngredient = Backbone.View.extend({

  events: {
    "click .delete-ingredient": "deleteIngredient"
  },

  tagName: "li",

  template: JST["recipes/new_ingredient"],

  render: function() {
    this.$el.html(this.template());
    return this;
  },

  deleteIngredient: function(event) {
    event.preventDefault();
    this.remove();
  },


});
