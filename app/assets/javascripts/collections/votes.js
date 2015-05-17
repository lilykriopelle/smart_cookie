CookingGenius.Collections.Votes = Backbone.Collection.extend({

  url: '/api/votes',
  model: CookingGenius.Models.Vote,

  getOrFetch: function(id) {
    var vote = this.get(id);
    var votes = this;

    if (vote) {
      vote.fetch();
    } else {
      vote = new CookingGenius.Models.Recipe({id: id});
      vote.fetch({
        success: function() {
          votes.add(vote);
        }
      });
    }
    return vote;
  }

});
