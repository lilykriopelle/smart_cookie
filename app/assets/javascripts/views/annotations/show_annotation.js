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

  toggleAnnotationUpvote: function() {
    if (this.model.get("can_vote") == true) {
      this.upvote();
    } else {
      this.downvote();
    }
  },

  upvote: function() {
    var vote = new CookingGenius.Models.Vote({
      voter_id: CookingGenius.currentUser.id,
      voteable_id: this.model.id,
      voteable_type: "Annotation"
    });

    vote.save({}, {
      success: function() {
        var num_votes = this.model.get("num_votes") + 1;
        this.$(".num-votes").html(num_votes);
        this.model.set({can_vote: false, vote_id: vote.id, num_votes: num_votes});
      }.bind(this)
    });
  },

  downvote: function() {
    $.ajax({
      url: '/api/votes/' + this.model.get("vote_id"),
      type: 'DELETE',
      success: function() {
        var num_votes = this.model.get("num_votes") - 1;
        this.$(".num-votes").html(num_votes);
        this.model.set({can_vote: true, vote_id: null, num_votes: num_votes});
      }.bind(this)
    });
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
