CookingGenius.Views.AnnotationShow = Backbone.View.extend({

  template: JST["annotations/show"],
  className: "annotation-show group",

  events: {
    "click .upvote-annotation": "upvoteAnnotation",
    "click .remove-upvote": "removeUpvote",
    "click .toggle-annotation-upvote": "toggleAnnotationUpvote"
  },

  initialize: function() {
    this.listenTo(this.model, "sync", this.render);
    this.listenTo(this.model.votes(), "add remove", this.render);
  },

  toggleAnnotationUpvote: function() {
    vote = this.model.votes().where({voter_id: CookingGenius.currentUser.id});
    if (vote[0]) {
      vote[0].destroy();
    } else {
      var vote = new CookingGenius.Models.Vote({
        voter_id: CookingGenius.currentUser.id,
        voteable_id: this.model.id,
        voteable_type: "Annotation"
      });

      vote.save({}, {
        success: function() {
          this.model.votes().add(vote);
        }.bind(this)
      });
    }
  },

  render: function() {
    this.$el.html(this.template({ annotation: this.model }));
    return this;
  }
});
