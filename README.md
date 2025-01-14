# node-named - DNS Server in Node.js

Node-named is a lightweight DNS server written in pure javascript. It has
limited support for the DNS spec, but aims to implement all of the *common*
functionality that is in use today. 


## Creating a DNS Server
```javascript
var named = require('./lib/index');
var server = named.createServer();
var ttl = 300;

server.listen(53, '0.0.0.0', function() {
  console.log('DNS server started on port 53');
});

server.on('query', function(query) {
  var domain = query.name();
  console.log('DNS Query: %s', domain)
  var target = new named.SOARecord(domain, {serial: 12345});
  query.addAnswer(domain, target, ttl);
  server.send(query);
});

server.on('error', function(e) {
  console.log('server error', e);
});
```

## Set Authoritative AA bit for all server responses

Start the server with the `authoritative` option set to 1.
```
var server = named.createServer({authoritative: 1});
```
## Creating DNS Records

node-named provides helper functions for creating DNS records. 
The records are available under 'named.record.NAME' where NAME is one
of ['A', 'AAAA', 'CNAME', 'SOA', 'MX', 'NS', 'TXT, 'SRV']. It is important to 
remember that these DNS records are not permanently added to the server. 
They only exist for the length of the particular request. After that, they are
destroyed. This means you have to create your own lookup mechanism.
```javascript
var named = require('node-named');
    
var soaRecord = new named.SOARecord('example.com', {serial: 201205150000});
console.log(soaRecord);
```
### Supported Record Types

The following record types are supported

 * A (ipv4)
 * AAAA (ipv6)
 * CNAME (aliases)
 * SOA (start of authority)
 * MX (mail server records)
 * NS (nameserver entries)
 * TXT (arbitrary text entries)
 * SRV (service discovery)

## Logging

node-named uses [http://github.com/trentm/node-bunyan](bunyan) for logging.
It's a lot nicer to use if you npm install bunyan and put the bunyan tool in
your path. Otherwise, you will end up with JSON formatted log output by default.

### Replacing the default logger

You can pass in an alternate logger if you wish. If you do not, then it will use
bunyan by default. Your logger must expose the functions 'info', 'debug',
'warn', 'trace', 'error', and 'notice'.

### TODO

 * Better record validation
 * Create DNS client for query recursor
 * Add support for PTR records
 * Add support for TCP AXFR requests

 
