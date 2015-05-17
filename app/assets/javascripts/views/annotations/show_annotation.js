CookingGenius.Views.AnnotationShow = Backbone.View.extend({

  template: JST["annotations/show"],
  className: "annotation-show",

  events: {
    "click .upvote-annotation": "upvoteAnnotation"
  },

  initialize: function() {
    this.listenTo(this.model, "sync", this.render);
    this.listenTo(this.model.votes(), "add", this.render);
  },

  upvoteAnnotation: function(event) {
    event.preventDefault();
    var vote = new CookingGenius.Models.Vote({
      voter_id: CookingGenius.currentUser.id,
      voteable_id: this.model.id,
      voteable_type: "Annotation"
    });

    vote.save();
  },

  render: function() {
    this.$el.html(this.template({annotation: this.model}));
    return this;
  }
});
