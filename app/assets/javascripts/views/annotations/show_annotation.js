CookingGenius.Views.AnnotationShow = Backbone.CompositeView.extend({

  template: JST["annotations/show"],
  className: "annotation-show group draggable",

  events: {
    "click .upvote-annotation": "upvoteAnnotation",
    "click .remove-upvote": "removeUpvote",
    "click .toggle-annotation-upvote": "toggleUpvote",
    "click .reply": "submitReply"
  },

  initialize: function() {
    this.voteableType = "Annotation";
    this.listenTo(this.model, "sync", this.render);
    this.listenTo(this.model.replies(), "add", this.render);
  },

  submitReply: function(event) {
    event.preventDefault();
    var replyBody = this.$(".reply-text").val();
    if (replyBody.length > 0) {
      var attrs = {
        num_votes: 0,
        body: replyBody,
        author_id: CookingGenius.currentUser.id,
        annotation_id: this.model.id
      };
      this.model.replies().create(attrs);
    }
  },

  render: function() {
    this.$el.html(this.template({ annotation: this.model }));
    this.model.replies().each(function(reply){
      var replyShow = new CookingGenius.Views.ReplyShow({model: reply});
      this.addSubview(".replies", replyShow, true);
    }.bind(this));
    return this;
  }
});

_.extend(
  CookingGenius.Views.AnnotationShow.prototype,
  CookingGenius.Mixins.Voteable
);
