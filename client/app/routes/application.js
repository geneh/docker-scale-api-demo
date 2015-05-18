import Ember from 'ember';
import ENV from'../config/environment';

export default Ember.Route.extend({
  model: function() {
    var url = ENV.hostAndNamespace + '/all';
    return Ember.$.ajax({
      url: url,
      type: 'GET',
      contentType: 'application/json; charset=utf-8',
      dataType: 'json',
      headers: {'Accept':'application/json'}
    }).done(function(data){
      return data;
    });
  }
});
