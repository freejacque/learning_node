'use strict';

var Percolator = require('percolator').Percolator;
var dbSession = require('../../src/backend/dbSession.js');

var port = 8080;
var server = Percolator({'port': port, 'autolink': false});

server.route('/api/keywords',
  {
    GET: function(request, response) {
      dbSession.fetchAll('SELECT id, value, categoryID FROM keyword ORDER BY id',

      function(err, rows) {
        if(err) {
          console.log(err);
          response.status.internalServerError(err);
        } else {
          response.collection(rows).send();
        }
      });
    }
  }
);

server.listen(function() {
  console.log('Server started and listening on port', port);
});
