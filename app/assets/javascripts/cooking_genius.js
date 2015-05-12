window.CookingGenius = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function(options) {
    this.router = new CookingGenius.Routers.Router({$rootEl: $("#content")});
    this.currentUser = new CookingGenius.Models.User({id: options.userId});
    Backbone.history.start();
    this.currentUser.fetch({
      success: function() {
        Backbone.history.navigate("/users/" + this.currentUser.id, {trigger: true});
      }.bind(this)
    });
  }
};
