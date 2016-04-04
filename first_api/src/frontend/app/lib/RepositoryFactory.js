'use strict';

(function() {

  var app = angular.module('app');

  app.factory(
    'RepositoryFactory',
    ['Restangular', '$q', RepositoryFactory]
  );

  function RepositoryFactory(Restangular, $q) {

    Restangular.setBaseUrl('/api/');

    var Repository = function(options) {
      this.endpoint = options.endpoint;
      this.retrieveItems = options.retrieveItems;
    };

    // TODO add functions for the needed API operations
    // this a wrapper
  }
})
