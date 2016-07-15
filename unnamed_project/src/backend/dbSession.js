'use strict'

var env = require('./env');
var dbOptions = require('../../database.json')[env];
var DBWrapper = require('node-dbi').DBWrapper;

var dbWrapper;

if(dbOptions.driver === 'sqlite3') {
  dbWrapper = new DBWrapper('sqlite3', {'path': dbOptions.filename});
} else if (dbOptions.driver === 'mysql') {

} else {

}
