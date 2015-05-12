window.CookingGenius = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    this.router = new CookingGenius.Routers.Router({$rootEl: $("#content")});
    Backbone.history.start();
  }
};
