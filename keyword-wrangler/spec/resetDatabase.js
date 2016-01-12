'use strict';

var async = require('async');
// uses a dbSession object
var resetDatabase = function(dbSession, callback) {

  async.series(
    [

      function(callback) {
        dbSession.remove('keyword', '1', function(err) {
          callback(err)
        });
      },

      function(callback) {
        dbSession.remove('category', '1', function(err) {
          callback(err)
        });
      },

      function(callback) {
        dbSession.remove('sqlite_sequence', '1', function(err) {
          callback(err)
        });
      }

    ],

    function(err, results) {
      callback(err);
    }
  );

};
//  exports the resetDatabase function so it can be used in other files
module.exports = resetDatabase;
