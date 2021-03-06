'use strict';

var request = require('request');
var dbSession = require('../../src/backend/dbSession.js');
var Server = require('../../src/backend/server.js').Server;
var resetDatabase = require('../resetDatabase.js');
var async = require('async');

describe('The API', function() {

  var server;

  beforeEach(function(done) {
    // using a different port for tests
    server = Server('8081');
    server.listen(function(err) {
      resetDatabase(dbSession, function() {
        done(err);
      });
    });
  });

  afterEach(function(done) {
    server.close(function() {
      resetDatabase(dbSession, function() {
        done();
      });
    });
  });
  //  tests for correct server response
  it('should respond to a GET request at /api/keywords/', function(done) {
    // expected content from the DB
    var expected = {
      "_items": [
        {'id': 1, 'value': 'Aubergine', 'categoryID': 1},
        {'id': 2, 'value': 'Onion', 'categoryID': 1},
        {'id': 3, 'value': 'Knife', 'categoryID': 2}
      ]
    };

    async.series(
      [
        function(callback) {
          resetDatabase(dbSession, callback);
        },

        function(callback) {
          dbSession.insert(
            'keyword',
            {'value': 'Aubergine', 'categoryID': 1},
            function(err) { callback(err) });
        },

        function(callback) {
          dbSession.insert(
            'keyword',
            {'value': 'Onion', 'categoryID': 1},
            function(err) { callback(err) });
        },

        function(callback) {
          dbSession.insert(
            'keyword',
            {'value': 'Knife', 'categoryID': 2},
            function(err) { callback(err) });
        }

      ],

      function(err, results) {
        if(err) throw(err);
        request.get(
          {
            'url': 'http://localhost:8080/api/keywords/',
            'json': true
          },
          function(err, res, body) {
            expect(res.statusCode).toBe(200);
            expect(body).toEqual(expected);
            done();
          }
        );
      });
    });
  // the above empties the db, inserts test data and expects
  // the web service API to respond with the inserted

  //  this should statement checks for categories data
  it('should respond to a GET request at /api/keywords/categories/', function(done) {
    var expected = {
      "_items": [
        {'id': 1, 'name': 'Vegetable'},
        {'id': 2, 'name': 'Utility'}
      ]
    };

    async.series(
      [

        function(callback) {
          resetDatabase(dbSession, callback);
        },

        function(callback) {
          dbSession.insert(
            'category',
            {'name': 'Vegetable'},
            function(err) { callback(err) });
        },

        function(callback) {
          dbSession.insert(
            'category',
            {'name': 'Utility'},
            function(err) { callback(err) });
        }

      ],

      function(err, results) {
        if(err) throw(err);
        request.get(
          {
            'url': 'http://localhost:8081/api/keywords/categories/',
            'json': true
          },
          function(err, res, body) {
            expect(res.statusCode).toBe(200);
            expect(body).toEqual(expected);
            done();
          });
      });
  });

  it('should create a new keyword when receiving a POST request at /api/keywords/', function(done) {
    var expected = {
      "_items": [
      {'id': 1, 'value': 'Aubergine', 'categoryID': 1},
      {'id': 2, 'value': 'Onion', 'categoryID': 1}
      ]
    };

    var body = {
      'value': 'Onion',
      'categoryID': 1
    };

    async.series(
      [

        function(callback) {
          dbSession.insert(
            'category',
            {'name': 'Vegetable'},
            function(err) { callback(err) });
        },

        function(callback) {
          dbSession.insert(
            'keyword',
            {'value': 'Aubergine', 'categoryID': 1},
            function(err) { callback(err) });
        }

      ],

      function(err, results) {
        if(err) throw(err);
        request.post(
        {
          'url': 'http://localhost:8081/api/keywords/',
          'body': body,
          'json': true
        },
        function(err, res, body) {
          if(err) throw(err);
          expect(res.statusCode).toBe(200);
          request.get(
            {
              'url': 'http://localhost:8081/api/keywords/',
              'json': true
            },
            function(err, res, body) {
              expect(res.statusCode).toBe(200);
              expect(body).toEqual(expected);
              done();
            }

          );
        });
      }
    );
  });

  it('should update a keyword when receiving a POST request at /api/keywords/:id/', function(done) {
    var expected = {
      "_items": [
        {'id': 1, 'value': 'Onion', 'categoryID': 2}
      ]
    };

    var body = {
      'id': 1,
      'value': 'Onion',
      'categoryID': 2
    };

    async.series(
      [
        function(callback) {
          dbSession.insert(
            'category',
            {'name': 'Vegetable'},
            function(err) { callback(err) });
        },

        function(callback) {
          dbSession.insert(
            'category',
            {'name': 'Utility'},
            function(err) { callback(err) });
        },

        function(callback) {
          dbSession.insert(
            'keyword',
            {'value': 'Aubergine', 'categoryID': 1},
            function(err) { callback(err) });
        }

      ],

      function(err, results) {
        if(err) throw(err);
        request.post(
        {
          'url' : 'http://localhost:8081/api/keywords/1',
          'body': body,
          'json': true
        },
        function(err, response, body) {
          if(err) throw(err);
          expect(response.statusCode).toBe(200);
          request.get(
          {
            'url' : 'http://localhost:8081/api/keywords/',
            'json': true
          },
          function(err, response, body) {
            expect(response.statusCode).toBe(200);
            done();
          });
        });
      }
    );
  });

  it('should remove a keyword when receiving a DELETE request at /api/keywords/:id/', function(done) {
    var expected = {
      "_items": [
        {'id': 1, 'value': 'Aubergine', 'categoryID': 1}
      ]
    };

    async.series(
      [

        function(callback) {
          dbSession.insert(
            'category',
            {'name': 'Vegetable'},
            function(err) { callback(err) });
        },

        function(callback) {
          dbSession.insert(
            'keyword',
            {'value': 'Aubergine', 'categoryID': 1},
            function(err) { callback(err) });
        },

        function(callback) {
          dbSession.insert(
            'keyword',
            {'value': 'Onion', 'categoryID': 1},
            function(err) { callback(err) });
        }

      ],

      function(err, results) {
        if(err) throw(err);
        request.del(
          {
            'url' : 'http://localhost:8081/api/keywords/2/',
            'json': true
          },
          function(err, response, body) {
            if(err) throw(err);
            request.get(
            {
              'url' : 'http://localhost:8081/api/keywords/',
              'json': true
            },
            function(err, response, body) {
              expect(response.statusCode).toBe(200);
              expect(body).toEqual(expected);
              done();
            }
          );
        });
      });
    });
  });

//  to run tests ./node_modules/.bin/jasmine-node --verbose --captureExceptions ./spec/
