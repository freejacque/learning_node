'use strict'

var env = require('./env');
var dbOptions = require('../../database.json')[env];
var DBWrapper = require('node-dbi').DBWrapper;

var dbWrapper;

if(dbOptions.driver === 'sqlite3') {

} else if (dbOptions.driver === 'mysql') {

} else {

}
