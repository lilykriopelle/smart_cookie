CookingGenius.Views.RecipeForm = Backbone.CompositeView.extend({

  events: {
    "click .create-recipe": "submit",
    "click .minimize": "minimize",
    "click .add-ingredient": "addIngredient",
    "change #recipe-image": "fileInputChange"
  },

  tagName: "form",

  className: "recipe-form group",

  template: JST["recipes/recipe_form"],

  submit: function() {
    event.preventDefault();
    var formData = this.$el.serializeJSON().recipe;
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

  fileInputChange: function(event) {
    var that = this;
    var file = event.currentTarget.files[0];
    this.$(".filename").text(file.name);
    var reader = new FileReader();

    reader.onloadend = function(){
      that.model._image = reader.result;
    };

    if (file) {
      reader.readAsDataURL(file);
    } else {
      that._updatePreview("");
      delete that.model._image;
    }
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
