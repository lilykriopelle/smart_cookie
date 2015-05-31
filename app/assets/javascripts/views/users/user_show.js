CookingGenius.Views.UserShow = Backbone.CompositeView.extend({

  template: JST["users/show"],

  className: "user-show",

  events: {
    "click .display-recipe-form": "displayRecipeForm",
    "click .toggle-user-upvote": "toggleUpvote",
    "dblclick .user-name": "editProfile",
    "blur .user-name": "updateProfile"
  },

  initialize: function() {
    this.listenTo(this.model, "sync", this.render);
    this.listenTo(this.model.authoredRecipes(), "sync", this.render);
    this.voteableType = "User";
  },

  editProfile: function() {
    if (CookingGenius.currentUser && this.model.id == CookingGenius.currentUser.id) {
      this.$(".user-name").replaceWith('<input class="user-name" type="text" value="' + this.model.escape("name") + '">');
    }
  },

  updateProfile: function() {
    var newName = this.$(".user-name").val();
    if (newName != this.model.escape("name")) {
      this.model.set({name: newName});
      this.model.save({}, {
        success: function() {
          this.$(".user-name").replaceWith('<h1 class="user-name group">' + this.model.escape("name") + '</h1>');
        }.bind(this)
      });
    }
  },

  displayRecipeForm: function() {
    this.$(".new-recipe").empty();
    var recipeForm = new CookingGenius.Views.RecipeForm({
      model: new CookingGenius.Models.Recipe(),
      collection: this.model.authoredRecipes()
    });
    this.addSubview(".new-recipe", recipeForm);
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

_.extend(
  CookingGenius.Views.UserShow.prototype,
  CookingGenius.Mixins.Voteable
);
