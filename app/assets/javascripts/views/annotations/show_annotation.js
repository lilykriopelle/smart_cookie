CookingGenius.Views.AnnotationShow = Backbone.View.extend({

  template: JST["annotations/show"],

  initialize: function() {
    this.listenTo(this.model, "sync", this.render);
  },

  className: "annotation-show",

  render: function() {
    this.$el.html(this.template({annotation: this.model}));
    return this;
  }
});
