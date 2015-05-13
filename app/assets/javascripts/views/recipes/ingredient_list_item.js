CookingGenius.Views.IngredientListItem = Backbone.View.extend({

  tagName: "li",

  className: "ingredient",

  template: JST["recipes/ingredient_list_item"],

  initialize: function() {
    this.listenTo(this.model, "sync", this.render);
  },

  render: function() {
    this.$el.html(this.template({ingredient: this.model}));
    return this;
  }

});
