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
        // this.wrapSelectionInSpan();
        this.collection.add(this.model);
      }.bind(this)
    });

    this.remove();
  },

  wrapSelectionInSpan: function() {
    var start = this.model.get("start_idx");
    var end = this.model.get("end_idx");
    var selection = this.$text.text().slice(start, end);
    var wrappedSelection = '<a class="annotation" href="#" data-id="' + this.model.id + '">' + selection + "</a>"
    // HELP! I need to keep the pre as HTML but how do I get the correct start index?
    var pre = this.$text.text().slice(0, start);
    var post = this.$text.html().slice(end);
    var newText = pre + wrappedSelection + post;
    this.$text.html(newText);
  },

  calculateHTMLOffset: function(node) {
    // if there's no HTML element to left, return plain text index, otherwise add length of
    // html el and recursively hop left?  Is there an easier/better way?
  },

  render: function() {
    this.$el.html(this.template({annotation: this.model}));
    return this;
  }
  
});
