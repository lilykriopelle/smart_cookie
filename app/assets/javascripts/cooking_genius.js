window.CookingGenius = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},

  initialize: function(options) {
    this.router = new CookingGenius.Routers.Router({$rootEl: $("#content")});
    this.currentUser = new CookingGenius.Models.Session();
    this.currentUser.fetch();
    Backbone.history.start();
  }
};
