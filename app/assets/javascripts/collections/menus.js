CookingGenius.Collections.Menus = Backbone.Collection.extend({

  url: 'api/menus',

  model: CookingGenius.Models.Menu,

  getOrFetch: function(id) {
    var menu = this.get(id);
    var menus = this;

    if (menu) {
      menu.fetch();
    } else {
      menu = new CookingGenius.Models.Menu({id: id});
      menu.fetch({
        success: function() {
          menus.add(menu);
        }
      });
    }
    return menu;
  }
});

CookingGenius.menus = new CookingGenius.Collections.Menus();
