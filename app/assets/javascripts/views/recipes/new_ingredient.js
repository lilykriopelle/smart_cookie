CookingGenius.Views.NewIngredient = Backbone.View.extend({

  tagName: "li",

  template: JST["recipes/new_ingredient"],
  
  render: function() {
    this.$el.html(this.template());
    return this;
  }

});
