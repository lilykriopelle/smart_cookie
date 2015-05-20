CookingGenius.Collections.SearchResults = Backbone.Collection.extend({

  initialize: function() {
    this.searchInfo = {};
  },

  parse: function(response) {
    this.searchInfo.totalPages = response.total_pages;
    return response.search_results;
  },

  url: '/api/search',

  model: function(attrs) {
    var type = attrs._type;
    delete attrs._type;
    return new CookingGenius.Models[type](attrs);
  },

  comparator: function(result) {
    return result.votes().length;
  }

});
