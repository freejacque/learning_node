'use strict';

var Percolator = require('percolator').Percolator
var dbSession = require('../../src/backend/dbSession.js');

var Server = function(port) {
  var server = Percolator({'port': port, 'autolink': false, 'staticDir': __dirname + '/../frontend'});

  server.route('/api/unnamed'),
  {
    GET: function(request, response) {
      dbSession.fetchAll('SELECT id, value FROM table ORDER BY id',
        function(err, rows) {
          if(err) {
            console.log(err);
            response.status.internalServerError(err);
          } else {
            response.collection(rows).send();
          }
        }
      );
    }
  }
}
