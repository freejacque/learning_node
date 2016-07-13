'use strict'

var env = require('./env');
var dbOptions = require('../../database.json')[env];
var DBWrapper = require('node-dbi').DBWrapper;

var dbWrapper;
