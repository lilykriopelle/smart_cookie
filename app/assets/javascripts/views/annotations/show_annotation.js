CookingGenius.Views.AnnotationShow = Backbone.CompositeView.extend({

  template: JST["annotations/show"],
  className: "annotation-show group draggable",

  events: {
    "click .upvote-annotation": "upvoteAnnotation",
    "click .remove-upvote": "removeUpvote",
    "click .toggle-annotation-upvote": "toggleAnnotationUpvote",
    "click .reply": "submitReply"
  },


  initialize: function() {
    this.listenTo(this.model, "sync", this.render);
    this.listenTo(this.model.votes(), "add remove", this.render);
    this.listenTo(this.model.replies(), "add", this.render);
  },

  submitReply: function(event) {
    event.preventDefault();
    var replyBody = this.$(".reply-text").val();
    if (replyBody.length > 0) {
      var attrs = {
        body: replyBody,
        author_id: CookingGenius.currentUser.id,
        annotation_id: this.model.id
      };
      this.model.replies().create(attrs);
    }
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
    this.model.replies().each(function(reply){
      var replyShow = new CookingGenius.Views.ReplyShow({model: reply});
      this.addSubview(".replies", replyShow, true);
    }.bind(this));
    return this;
  }
});
