'use strict';

var async = require('async');
var env = require('../src/backend/env');
var dbOptions = require('../database.json')[env];

var resetDatabase = function (dbSession, callback) {

  if(dbOptions.driver === 'sqlite3') {

    async.series(
      [

        function(callback) {
          dbSession.remove()
        }
      ]
    )
  }
}
