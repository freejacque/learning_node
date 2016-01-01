'use strict';

var Percolator = require('percolator').Percolator;
var dbSession = require('../../src/backend/dbSession.js');

var port = 8080;
var server = Percolator({'port': port, 'autolink': false});

server.route('/api/keywords',
  {
    GET: function(request, response) {
      response.object({'foo': 'bar'}).send()
    }
  }
);

server.listen(function() {
  console.log('Server started and listening on port', port);
});
