'use strict';

var Percolator = require('percolator').Percolator;
var dbSession = require('../../src/backend/dbSession.js');

var Server = function(port) {
  var server = Percolator({'port': port, 'autoLink': false, 'staticDir': __dirname + '/../frontend'});

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
      },

      POST: function(request, response) {
        // onJson = Percolator method that provides post request body data
        request.onJson(function(err, newKeyword) {
          if(err) {
            console.log(err);
            response.status.internalServerError(err);
          } else {
            dbSession.query('INSERT INTO keyword (value, categoryID) VALUES (?, ?);',
              [newKeyword.value, newKeyword.categoryID], function(err, result) {
                if(err) {
                  console.log(err);
                  response.status.internalServerError(err);
                } else {
                  response.object({'status': 'ok', 'id': result.insertID}).send();
                }
              });
          }
        });
      }
    }
  );
  //  this route has to be defined before /api/keywords/:id so that the /categories requests won't be interpretted as /:id
  server.route('/api/keywords/categories',
  {
    GET: function(req, res) {
      dbSession.fetchAll('SELECT id, name FROM category ORDER BY id', function(err, rows) {
        if(err) {
          console.log(err);
          res.status.internalServerError(err);
        } else {
          res.collection(rows).send();
        }
      });
    }
  });
  //  route for updating keywords
  server.route('/api/keywords/:id',
    {
      POST: function(request, response) {
        var keywordID = request.uri.child();
        request.onJson(function(err, keyword) {
          if(err) {
            console.log(err);
            response.status.internalServerError(err);
          } else {
            dbSession.query('UPDATE keyword SET value = ?, categoryID = ? WHERE keyword.id = ?;', [keyword.value, keyword.categoryID, keywordID], function(err, result) {
              if(err) {
                console.log(err);
                response.status.internalServerError(err);
              } else {
                response.object({'status': 'ok'}).send();
              }
            });
          }
        });
      }
    });

  return server;
};

module.exports = {'Server': Server};
