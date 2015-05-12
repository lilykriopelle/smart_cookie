CookingGenius.Collections.Users = Backbone.Collection.extend({

  model: CookingGenius.Models.User,

  url: 'api/users',

  getOrFetch: function(id) {
    var user = this.get(id);
    var users = this;

    if (user) {
      user.fetch();
    } else {
      user = new CookingGenius.Models.User({id: id});
      user.fetch({
        success: function() {
          users.add(user);
        }
      });
    }
    return user;
  }

});

CookingGenius.users = new CookingGenius.Collections.Users();
