import Ember from 'ember';
import ENV from'../config/environment';

export default Ember.Route.extend({
  model: function() {
    return Ember.$.ajax({
      url: ENV.hostAndNamespace + '/all',
      type: 'GET',
      contentType: 'application/json; charset=utf-8',
      dataType: 'json',
      headers: {'Accept':'application/json'}
    }).done(function(data){
      return data;
    });
  },
  afterModel: function(){
    var self = this;
    Ember.run.later(function() {
      self.refresh();
    }, 3000);
  }
});
