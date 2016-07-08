'use strict';

var Percolator = require('percolator').Percolator
var dbSession = require('../../src/backend/dbSession.js');

var Server = function(port) {
  var server = Percolator({'port': port, 'autolink': false, 'staticDir': __dirname + '/../frontend'});


}
