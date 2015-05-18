CookingGenius.Views.RecipeForm = Backbone.CompositeView.extend({

  events: {
    "click .create-recipe": "submit",
    "click .minimize": "minimize",
    "click .add-ingredient": "addIngredient"
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
      }.bind(this),

      error: function(model, response) {
        this.$(".errors").empty();
        var errors = JSON.parse(response.error().responseText);
        this.$(".errors").addClass("active");
        for (var i = 0; i < errors.length; i++) {
          this.$(".errors").append("<li>" + errors[i] + "</li>");
        }
      }.bind(this)
    });
  },

  addIngredient: function(event) {
    event.preventDefault();
    this.addSubview(".ingredients", new CookingGenius.Views.NewIngredient());
  },

  minimize: function(event) {
    event.preventDefault();
    this.remove();
  },

  render: function() {
    this.$el.html(this.template());
    return this;
  }

});
