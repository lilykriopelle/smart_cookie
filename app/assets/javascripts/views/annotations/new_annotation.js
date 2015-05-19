CookingGenius.Views.NewAnnotation = Backbone.View.extend({

  template: JST["annotations/new_annotation_form"],

  tagName: "form",

  className: "annotation-form",

  events: {
    "click button": "submit"
  },

  initialize: function(options) {
    this.$node = options.$node;
    this.$text = options.$text;
  },

  submit: function(event) {
    event.preventDefault();
    var formAttrs = this.$el.serializeJSON();
    this.model.save(formAttrs, {
      success: function() {
        this.collection.add(this.model);
      }.bind(this)
    });

    this.remove();
  },

  render: function() {
    this.$el.html(this.template({annotation: this.model}));
    return this;
  }

});
