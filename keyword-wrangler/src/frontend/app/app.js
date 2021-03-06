'use script';

(function() {

  var app = angular.module('app', ['ngRoute', 'ngGrid', 'restangular']);

  app.config(['$routeProvider',
    function($routeProvider) {
      // makes app/keywords/KeywordsConroller.js handle http://localhost:8080/#/URL
      $routeProvider.when('/', {
        templateUrl: 'app/keywords/partials/editor.html',
        controller: 'KeywordsController'
      });

    }]);

})();

//  defines the main entry point for AngularJS apps.
//  sets up dependencies and in-app routing
