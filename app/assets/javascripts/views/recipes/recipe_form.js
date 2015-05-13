CookingGenius.Views.RecipeForm = Backbone.CompositeView.extend({

  events: {
    "click .create-recipe": "submit",
    "click .add-ingredient": "addIngredient",
  },

  tagName: "form",

  className: "recipe-form",

  template: JST["recipes/recipe_form"],

  submit: function() {
    event.preventDefault();
    var formData = this.$el.serializeJSON();
    this.model.save(formData, {
      success: function() {
        this.collection.add(this.model);
      }.bind(this)
    });
  },

  addIngredient: function(event) {
    event.preventDefault();
    this.addSubview(".ingredients", new CookingGenius.Views.NewIngredient());
  },

  render: function() {
    this.$el.html(this.template());
    return this;
  }

});
