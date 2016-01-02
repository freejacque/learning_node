'use strict';

var Percolator = require('percolator').Percolator;
var dbSession = require('../../src/backend/dbSession.js');

var Server = function(port) {
  var server = Percolator({'port': port, autoLink: false});

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

  return server;
};

module.exports = {'Server': Server};
