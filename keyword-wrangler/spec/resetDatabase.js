'use strict';

var async = require('async');
var env = require('../src/backend/env');
var dbOptions = require('../database.json')[env];
// uses a dbSession object
var resetDatabase = function(dbSession, callback) {

  if(dbOptions.driver === 'sqlite3') {

    async.series(
      [

        function(callback) {
          dbSession.remove('keyword', '1', function(err) {
            callback(err);
          });
        },

        function(callback) {
          dbSession.remove('category', '1', function(err) {
            callback(err);
          });
        },

        function(callback) {
          dbSession.remove('sqlite_sequence', '1', function(err) {
            callback(err, null);
          });
        }

      ],

      function(err, results) {
        callback(err);
      }
    );

  }
  //  for production db
  if(dbOptions.driver === 'mysql') {

    async.series(
      [

        function(callback) {
          dbSession.remove('TRUNCATE keyword', [], function(err) {
            callback(err);
          });
        },

        function(callback) {
          dbSession.remove('TRUNCATE category', [], function(err) {
            callback(err);
          });
        }

      ],

      function(err, results) {
        callback(err);
      }
    );

  }

};
//  exports the resetDatabase function so it can be used in other files
module.exports = resetDatabase;
