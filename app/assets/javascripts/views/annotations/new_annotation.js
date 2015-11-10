CookingGenius.Views.NewAnnotation = Backbone.View.extend({

  template: JST["annotations/new_annotation_form"],

  tagName: "form",

  className: "annotation-form",

  events: {
    "click .create-annotation": "submit",
    "change #annotation-image": "fileInputChange",
    "click": "stopPropagation"
  },

  initialize: function(options) {
    this.annotatable = options.annotatable;
    this.annotatable_type = options.annotatable_type;
    this.$node = options.$node;
    this.$text = options.$text;
  },

  stopPropagation: function(event) {
    event.stopPropagation();
  },

  submit: function(event) {
    event.preventDefault();
    var formAttrs = this.$el.serializeJSON().annotation;
    this.model.save(formAttrs, {
      success: function() {
        this.collection.add(this.model);
        if (this.annotatable_type == "Recipe") {
          this.annotatable.fetch();
        } else {
          CookingGenius.recipes.getOrFetch(this.annotatable.get("recipe_id"));
        }
      }.bind(this),

      error: function(model, response) {
      }
    });

    this.remove();
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
      delete that.model._image;
    }
  },

  render: function() {
    this.$el.html(this.template({annotation: this.model}));
    return this;
  }

});
