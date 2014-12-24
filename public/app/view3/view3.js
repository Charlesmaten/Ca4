'use strict';

angular.module('myAppRename.view3', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view3', {
    templateUrl: 'app/view3/view3.html',
    controller: 'searchWikiController'
  });
}])

.controller('searchWikiController', function ($scope, $http) {
    $scope.searchString = "";
    $scope.found = "";


    $scope.getWiki = function () {

      $http({
        method: 'GET',
        url: 'api/getWiki/' + $scope.searchString
      }).
          success(function (data, status, headers, config) {
            $scope.foundWiki = data;
          }).
          error(function (data, status, headers, config) {
            $scope.error = data;
          });
      }
    });



