CookingGenius.Views.AnnotationShow = Backbone.View.extend({

  template: JST["annotations/show"],

  className: "annotation-show",

  render: function() {
    this.$el.html(this.template({annotation: this.model}));
    return this;
  }
});
