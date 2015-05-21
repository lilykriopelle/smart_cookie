CookingGenius.Views.NewAnnotation = Backbone.View.extend({

  template: JST["annotations/new_annotation_form"],

  tagName: "form",

  className: "annotation-form",

  events: {
    "click .create-annotation": "submit"
  },

  initialize: function(options) {
    this.annotatable = options.annotatable;
    this.annotatable_type = options.annotatable_type;
    this.$node = options.$node;
    this.$text = options.$text;
  },

  submit: function(event) {
    event.preventDefault();
    var formAttrs = this.$el.serializeJSON();
    this.model.save(formAttrs, {
      success: function() {
        this.collection.add(this.model);
        if (this.annotatable_type == "Recipe") {
          this.annotatable.fetch();
        } else {
          CookingGenius.recipes.getOrFetch(this.annotatable.get("recipe_id"));
        }
      }.bind(this)
    });

    this.remove();
  },

  render: function() {
    this.$el.html(this.template({annotation: this.model}));
    return this;
  }

});
