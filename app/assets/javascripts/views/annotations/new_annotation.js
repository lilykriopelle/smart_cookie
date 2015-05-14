CookingGenius.Views.NewAnnotation = Backbone.View.extend({

  template: JST["annotations/new_annotation_form"],

  tagName: "form",

  className: "annotation-form",

  events: {
    "click button": "submit"
  },

  initialize: function(options) {
    this.$text = options.$text;
  },

  submit: function(event) {
    event.preventDefault();
    var formAttrs = this.$el.serializeJSON();
    this.model.save(formAttrs, {
      success: function() {
        this.wrapSelectionInSpan();
        this.collection.add(this.model);
      }.bind(this)
    });

    this.remove();
  },

  wrapSelectionInSpan: function() {
    var start = this.model.get("start_idx");
    var end = this.model.get("end_idx");
    var selection = this.$text.text().slice(start, end);
    var wrappedSelection = '<span class="annotation">' + selection + "</span>"
    var newText = this.$text.html().slice(0, start) + wrappedSelection + this.$text.html().slice(end);
    this.$text.html(newText);
  },

  render: function() {
    this.$el.html(this.template({annotation: this.model}));
    return this;
  }

});
