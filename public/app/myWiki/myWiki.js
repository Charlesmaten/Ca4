'use strict'

angular.module('myAppRename.myWiki', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/myWiki', {
            templateUrl: 'app/myWiki/myWiki.html',
            controller: 'dataController'

        });
    }])

    .controller('dataController', function($scope, $http){
        $scope.searchString= "";

        $scope.showFullWiki = function(){

            $http({

                method: 'GET',
                url : 'api/allInfo'

            })
                .success(function(data,status,headers,config){
                    $scope.fullWikki = data;

                })
                .error(function(data, status, headers, config){
                    $scope.error = data;

                })

        }

        $scope.getCategories = function(){
            $http({
                method: 'GET',
                url: 'api/getCategories'
            })
                .success(function(data, status, headers, config){
                    $scope.foundWiki = data;
                })
                .error(function(data, status, headers, config){
                    $scope.error = data;
                });
        }

        $scope.getWiki = function () {
            $http({
                method: 'GET',
                url: 'api/getWiki/' + $scope.searchString
            })
                .success(function(data, status, headers, config){
                    $scope.foundWiki = data;
                })
                .error(function(data, status, headers, config){
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
                .error(function(data, status, headers, config){

                    $scope.error = data;

                });
        }

        $scope.getWikisWithCategory = function () {

            $http({
                method: 'GET',
                url: 'api/getWikisWithCategory/' + $scope.searchString
            })
                .success(function(data, status, headers, config){

                    $scope.foundWiki = data;

                })
                .error(function(data, status, headers, config){

                    $scope.error = data;

                });
        }
    });


var defaultText = "Search...";
var searchBox = document.getElementById("search");

searchBox.value = defaultText;


searchBox.onfocus = function() {
    if (this.value == defaultText) {
        this.value = '';
    }
}

searchBox.onblur = function() {
    if (this.value == "") {
        this.value = defaultText;
    }
}