'use strict';

(function() {

  var app = angular.module('app');

  app.controller('KeywordsController', function($scope, RepositoryFactory, resolveEntity) {

    /* == Frontend Initialization == */

    /* All of this happens as soon as the page loads */

    /* resolveEntity is a helper function which is used
       in partials/keywordCategoryGridCell.html in order to
       display the name of a keyword category based on its id */

    $scope.resolveEntity = resolveEntity;

    /* A repo is the connection btwn this controller and the REST API
     One is used for keyword categories */
    var KeywordCategoriesRepository = new RepositoryFactory({
      endpoint: 'keywords/categories',
      retrieveItems: function(data) {
        return data._items;
      }
    });

    /* a repo for keywords */
    var KeywordsRepository = new RepositoryFactory({
      endpoint: 'keywords',
      retrieveItems: function(data) {
        return data._items;
      }
    });

    /* when the frontend loads the controller will immediately load all
    keyword categories and categories from the API */
    KeywordCategoriesRepository.readAll().then(function(keywordCategories) {
      $scope.keywordCategories = keywordCategories;
      KeywordsRepository.readAll().then(function(keywords) {
        $scope.keywords = keywords;
      });
    });

    /* this is the grid */
    $scope.keywordsGridOptions = {
      data: 'keywords', // this makes the grid use $scope.keywords data
      enableCellSelection: false, // if true, breaks edit of cells with the select element
      enableCellEdit: true,
      keepLastSelected: false,
      enableRowSelection: false,
      multiSelect: false,
      enableSorting: true,
      enableColumnResize: true,
      enableColumnReordering: true,
      showFilter: false,
      rowHeight: '40',
      columnDefs: [
        {
          field: 'id',
          displayName: 'ID',
          enableCellEdit: false,
          width: '80px'
        },
        {
          field: 'value',
          displayName: 'value'
        },
        {
          /* use our own template for keyword category */
          field: 'keywordCategoryID',
          displayName: 'Category',
          cellTemplate: 'app/keywords/partials/keywordCategoryGridCell.html',
          editableCellTemplate: 'app/keywords/partials/keywordCategoryGridCellEditor.html'
        },
        {
          field: '',
          displayName: 'Operations',
          cellTemplate: 'app/keywords/partials/operationsGridCell.html',
          enableCellEdit: false,
          sortable: false
        }
      ]
    };

    /* == Frontend Operations == */
    //  these functions are called on button click
    $scope.createKeyword = function(newKeyword) {
      $scope.$broadcast('ngGridEventEndCellEdit');
      if(newKeyword.value.length > 0) {
        KeywordsRepository.createOne(newKeyword).then(function() {
          KeywordsRepository.readAll().then(function(keywords) {
            $scope.keywords = keywords;
          });
        });
      }
    };

    $scope.updateKeyword = function(keyword) {
      $scope.$broadcast('ngGridEventEndCellEdit');
      KeywordsRepository.updateOne(keyword);
    };

    $scope.deleteKeyword = function(keyword) {
      $scope.$broadcast('ngGridEventEndCellEdit');
      KeywordsRepository.deleteOne(keyword).then(function() {
        KeywordsRepository.readAll().then(function(keywords) {
          $scope.keywords = keywords;
        });
      });
    };

    $scope.stopEditingKeywordCategory = function() {
      $scope.$broadcast('ngGridEventEndCellEdit');
    };

    $scope.$on('ngGridEventRows', function(newRows) {
      $scope.$broadcast('ngGridEventEndCellEdit');
    });

  });

})();
