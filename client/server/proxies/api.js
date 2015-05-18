var proxyPath = '/<%=camelizedModuleName %>';

module.exports = function(app) {
  // For options, see:
  // https://github.com/nodejitsu/node-http-proxy
  var proxy = require('http-proxy').createProxyServer({});

  proxy.on('error', function(err, req) {
    console.error(err, req.url);
  });

  app.use(proxyPath, function(req, res, next){
    // include root path in proxied request
    req.url = proxyPath + '/' + req.url;
    proxy.web(req, res, { target: '<%=proxyUrl %>' });
  });

  // curl -H "Content-Type:application/json" http://localhost:3000/api/all
  app.get('/api/all', function(req, res) {
    var payload = [{instance:'3uyf489gfh',hits:25},{instance:'8349hfrllj',hits:19},{instance:'8ferjfklnklj',hits:7},
      {instance:'4598tguiwrtg',hits:36},{instance:'yyefgefkjbk',hits:4},{instance:'90jfienjkffe',hits:44},
      {instance:'iogjtoigfdklr',hits:27},{instance:'89tf4iufhf',hits:11},{instance:'9045jiofsss',hits:33},
      {instance:'tg5hetytehrt',hits:11},{instance:'565gtggrgfgh',hits:29},{instance:'ghrterg',hits:3}];
    res.json(payload);
  });

// curl -X DELETE -H "Content-Type:application/json" http://localhost:3000/api/all
  app.delete('/api/all', function(req, res) {
    res.json({'status': 'Success'});
  });
};
