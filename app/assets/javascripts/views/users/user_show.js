CookingGenius.Views.UserShow = Backbone.CompositeView.extend({

  template: JST["users/show"],

  className: "user-show",

  events: {
    "click .display-recipe-form": "displayRecipeForm",
    "click .toggle-user-upvote": "toggleUserUpvote"
  },

  initialize: function() {
    this.listenTo(this.model, "sync", this.render);
    this.listenTo(this.model.authoredRecipes(), "sync", this.render);
  },

  displayRecipeForm: function() {
    this.$(".new-recipe").empty();
    var recipeForm = new CookingGenius.Views.RecipeForm({
      model: new CookingGenius.Models.Recipe(),
      collection: this.model.authoredRecipes()
    });
    this.addSubview(".new-recipe", recipeForm);
  },

  toggleUserUpvote: function() {
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
      voteable_type: "User"
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
    this.$el.html(this.template({user: this.model}));
    this.model.authoredRecipes().each(function(recipe) {
      var indexItem = new CookingGenius.Views.RecipeFeedItem({model : recipe});
      this.addSubview(".authored-recipes", indexItem);
    }.bind(this));
    return this;
  }

});
