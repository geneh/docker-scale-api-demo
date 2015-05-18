import Ember from 'ember';

export default Ember.Controller.extend({
  instances: function() {
    var hostNames = [];
    var data = this.get('model');
    for (var i=0; i<data.length; i++) {
      hostNames.push(data[i].instance);
    }
    return hostNames;
  }.property('model'),
  hits: function() {
    var numOfHits = [];
    var data = this.get('model');
    for (var i=0; i<data.length; i++) {
      numOfHits.push(data[i].hits);
    }
    return numOfHits;
  }.property('model'),
  chartData: function() {
    return {
      json: {
        data1: this.get('hits')
      },
      type: 'bar',
      names: {
        data1: 'Number of Hits'
      },
      labels: true
    };
  }.property('model'),
  chartConfig: function() {
    return {
      axis: {
        x: {
          type: 'category',
          tick: {
            rotate: 90,
            multiline: false
          },
          categories: this.get('instances')
        }
      }
    };
  }.property('model')
});
