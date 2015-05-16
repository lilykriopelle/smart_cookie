window.CookingGenius = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function(options) {
    this.router = new CookingGenius.Routers.Router({$rootEl: $("#content")});
    this.currentUser = new CookingGenius.Models.User({id: options.userId});
    this.currentUser.fetch();
    Backbone.history.start();
  },

  currentUserUrl: function() {
    return "/users/" + this.currentUser.id;
  }
};
