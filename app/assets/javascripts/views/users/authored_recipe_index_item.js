CookingGenius.Views.AuthoredRecipeIndexItem = Backbone.View.extend({

  template: JST["users/authored_recipe_index_item"],

  tagName: "li",

  className: "authored-recipe",

  render: function() {
    this.$el.html(this.template({recipe: this.model}));
    return this;
  }

});
