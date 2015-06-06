CookingGenius.Views.MenuShow = Backbone.CompositeView.extend({

  initialize: function() {
    this.listenTo(this.model, "sync", this.render);
    this.listenTo(this.model.recipes(), "sync", this.render);
  },

  events: {
    "click .delete-menu": "delete"
  },

  template: JST["menus/show"],

  className: "menu-show",

  delete: function() {
    this.model.destroy({
      success: function() {
        Backbone.history.navigate("", { trigger: true });
      }
    });
  },

  render: function() {
    this.$el.html(this.template({ menu: this.model }));
    this.model.recipes().each(function(recipe) {
      var recipeItem = new CookingGenius.Views.RecipeFeedItem({ model: recipe });
      this.addSubview(".menus-recipes-list", recipeItem);
    }.bind(this));
    return this;
  }
});
