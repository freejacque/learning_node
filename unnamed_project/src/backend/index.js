'use strict';

var Server = require('./server.js').Server;
var server = Server('8080');

server.listen(function() {
  console.log('Server started and listening in port', server.options.port);
});

// start server with: KW_ENV=dev node src/backend/index.js
