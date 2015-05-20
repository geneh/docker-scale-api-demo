import Ember from 'ember';
import ENV from'../config/environment';

export default Ember.Controller.extend({
  totalHits: Ember.computed.oneWay('prepareChartData.totalHits'),
  modelWithIndices: function() {
    return this.get('model').map(function(item, index) {
      item.index = index+1;
      return item;
    });
  }.property('model'),
  prepareChartData: function() {
    var chartData = {'instances':[], 'numOfHits': [], totalHits: 0};
    var data = this.get('model');
    for (var i=0; i<data.length; i++) {
      chartData.instances.push(data[i].instance);
      chartData.numOfHits.push(data[i].hits);
      chartData.totalHits += parseInt(data[i].hits, 10);
    }
    return chartData;
  }.property('model'),
  chartData: function() {
    return {
      json: {
        data1: this.get('prepareChartData.numOfHits')
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
          categories: this.get('prepareChartData.instances')
        }
      }
    };
  }.property('model'),
  lastUpdated: function() {
    var date = new Date(),
      hour = date.getHours(),
      min = date.getMinutes(),
      sec = date.getSeconds();
    return (hour % 12 || 12) + ':' + (min>9 ? min : '0'+min) + ':' +
      (sec>9 ? sec : '0'+sec) + ' ' + (hour<12 ? 'AM' : 'PM');
  }.property('model'),
  actions: {
    reset: function() {
      var self = this;
      Ember.$.ajax({
        url: ENV.hostAndNamespace + '/all',
        type: 'DELETE',
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        headers: {'Accept':'application/json'}
      }).done(function(){
        self.set('model', []);
      });
    }
  }
});
