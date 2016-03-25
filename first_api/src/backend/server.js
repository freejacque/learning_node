'use strict';

var Percolator = require('percolator').Percolator;
var dbSession = require('../../src/backend/dbSession.js');

var Server = function(port) {
  var server = Percolator({'port': port, 'autolink': false, 'staticDir': __dirname + '/../frontend'});

  // need to add routes and GET, POST, GET for each route

  return server;
};

module.exports = {'Server': Server};
