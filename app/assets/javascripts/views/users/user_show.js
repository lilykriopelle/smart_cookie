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
    this.listenTo(this.model.votes(), "add remove", this.render);
  },

  displayRecipeForm: function() {
    var recipeForm = new CookingGenius.Views.RecipeForm({
      model: new CookingGenius.Models.Recipe(),
      collection: this.model.authoredRecipes()
    });
    this.addSubview(".new-recipe", recipeForm);
  },

  toggleUserUpvote: function() {
    vote = this.model.votes().where({voter_id: CookingGenius.currentUser.id});
    if (vote[0]) {
      vote[0].destroy();
    } else {
      var vote = new CookingGenius.Models.Vote({
        voter_id: CookingGenius.currentUser.id,
        voteable_id: this.model.id,
        voteable_type: "User"
      });

      vote.save({}, {
        success: function() {
          this.model.votes().add(vote);
        }.bind(this)
      });
    }
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
