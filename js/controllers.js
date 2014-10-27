'use strict';

var xkcdAppControllers = angular.module('xkcdApp.controllers', []);

xkcdAppControllers.controller('comicController', function($rootScope, $scope, $stateParams, $log, comicService) {
    comicService.byId({id: $stateParams.id},
        function(comic) {
            $scope.comic = comic;
            if ('latest' == $stateParams.id) {
                $rootScope.latest = comic;
            }
        },
        function(error) {
            $log.error("Error getting comic " + $stateParams.id + ". Status " + error.status + ": " + error.config.url);
            $scope.error = error;
        }
    );
});

xkcdAppControllers.controller('aboutController', function($scope) {
    this.message = "hello";
});
