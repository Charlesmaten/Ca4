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

        $scope.showThis = function(){

            this.showing = true;

        }

        $scope.hoverOver = function(){

            this.hoverEdit = true;
        };

        $scope.hoverOut = function(){

            this.hoverEdit = false;
        };





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

        $scope.findWiki = function () {
            $http({
                method: 'GET',
                url: 'api/findWiki/' + $scope.searchString
            })
                .success(function(data, status, headers, config){
                    $scope.foundWiki = data;
                })
                .error(function(data, status, headers, config) {
                    $scope.error = data;
                });
        }




    });



