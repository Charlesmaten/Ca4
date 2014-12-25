'use strict';

angular.module('myAppRename.Categories', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/Categories', {
            templateUrl: 'app/Categories/Categories.html',
            controller: 'controllerCategory'
        });
    }])

    .controller('controllerCategory', function($scope, $http) {

        $scope.title = "Select a letter and get corresponding categories : "
        $scope.findCategories = function(letter) {
            $http({
                method: 'GET',
                url: 'api/categoriesAndTitles/' + letter
            })
                .success(function (data, status, headers, config) {
                    $scope.Categories = data;
                })
                .error(function (data, status, headers, config) {
                    $scope.error = data;
                });
        }

    });