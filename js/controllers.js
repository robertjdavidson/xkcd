var xkcdAppControllers = angular.module('xkcdApp.controllers', []);

xkcdAppControllers.controller('ComicController', function($rootScope, $scope, $stateParams, $log, Comic) {
    Comic.byId({id: $stateParams.id},
        function(comic) {
            $scope.comic = comic;
            if ('latest' == $stateParams.id) {
                $log.info("Setting latest comic to " + comic.num);
                $rootScope.latest = comic;
            }
        },
        function(error) {
            $log.error("Error getting comic " + $stateParams.id + ". Status " + error.status + ": " + error.config.url);
            $scope.error = error;
        });
});

xkcdAppControllers.controller('AboutController', function($scope) {
    this.message = "hello";
});