var named = require('../lib');
var server = named.createServer();

server.listen(53, '0.0.0.0', function() {
  console.log('DNS server started on port 53');
});


server.on('query', function(query) {
  var domain = query.name();
  var record = new named.CAARecord(0,"issue","this is test value");
  query.addAnswer(domain, record, 300);
  server.send(query);
});
