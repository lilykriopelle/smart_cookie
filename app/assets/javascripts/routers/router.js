CookingGenius.Routers.Router = Backbone.Router.extend({

  initialize: function(options) {
    this.$rootEl = options.$rootEl;
    this.listenTo(this.model, "sync", this.render);
  },

  routes: {
    "": "index",
    "users/new": "new",
    "users/:id": "show"
  },

  index: function() {

  },

  show: function(id) {
    var user = CookingGenius.users.getOrFetch(id);
    var userShow = new CookingGenius.Views.UserShow({model: user});
    this._swapView(userShow);
  },

  new: function() {
  },

  _swapView: function(view) {
    this._currentView && this._currentView.remove();
    this._currentView = view;
    this.$rootEl.html(view.render().$el);
  }

});
