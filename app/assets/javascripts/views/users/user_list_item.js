CookingGenius.Views.UserListItem = Backbone.View.extend({

  template: JST["users/user_list_item"],

  tagName: "li",

  className: "user-list-item group",

  initialize: function() {
    this.listenTo(this.model, "sync", this.render);
  },

  render: function() {
    this.$el.html(this.template({ user: this.model }));
    return this;
  }

});
