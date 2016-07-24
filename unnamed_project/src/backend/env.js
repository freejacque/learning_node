'use strict';

(function() {
  var env;

  if(process.env.KW_ENV) {
    env = process.env.KW_ENV;
  } else {
    env = 'test';
  }

})
