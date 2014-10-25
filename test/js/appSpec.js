'use strict';

describe("ComicController tests", function() {

    var rootScope, scope, log, stateParams, comicController, comicService, q, deferred;
    beforeEach(module("xkcdApp.controllers"));

    //Set up the mock comicService. Calls to the comicService will return a promise which is how Angular handles ansynchronous activity.
    // The mock comicService works in the same way and has been set up to all the test case to drive when the promise is fulfilled and how.
    beforeEach(function() {
        comicService = {
            data: {
                latest: {"news":"","link":"","img":"http://imgs.xkcd.com/comics/houston.png","num":1438,"day":"24","year":"2014","month":"10","title":"Houston","safe_title":"Houston","transcript":"","alt":"'Oh, hey Mom. No, nothing important, just at work.'"},
                1437: {"news":"","link":"","img":"http://imgs.xkcd.com/comics/higgs_boson.png","num":1437,"day":"22","year":"2014","month":"10","title":"Higgs Boson","safe_title":"Higgs Boson","transcript":"","alt":"'Can't you just use the LHC you already built to find it again?' 'We MAY have disassembled it to build a death ray.' 'Just one, though.' 'Nothing you should worry about.' 'The death isn't even very serious.'"},
                1436: {"news":"","link":"","img":"http://imgs.xkcd.com/comics/orb_hammer.png","num":1436,"day":"20","year":"2014","month":"10","title":"Orb Hammer","safe_title":"Orb Hammer","transcript":"","alt":"Ok, but make sure to get lots of pieces of rock, because later we'll decide to stay in a room on our regular orb and watch hammers hold themselves and hit rocks for us, and they won't bring us very many rocks."},
                1435: {"news":"","link":"","img":"http://imgs.xkcd.com/comics/presidential_alert.png","num":1435,"day":"17","year":"2014","month":"10","title":"Presidential Alert","safe_title":"Presidential Alert","transcript":"","alt":"When putting his kids to bed, after saying 'Goodnight', Obama has to stop himself from saying 'God bless you, and God bless the United States of America.'"},
                1434: {"news":"","link":"","img":"http://imgs.xkcd.com/comics/where_do_birds_go.png","num":1434,"day":"15","year":"2014","month":"10","title":"Where Do Birds Go","safe_title":"Where Do Birds Go","transcript":"","alt":"Water/ice has a lot of weird phases. Maybe asking 'where do birds go when it rains' is like asking 'where does Clark Kent go whenever Superman shows up?'"}
            },
            byId: function(params, onSuccess, onError) {
                deferred = q.defer();
                var promise = deferred.promise;
                var successCallback = function() {
                    onSuccess(comicService.data[params.id]);
                };
                var errorCallback = function(error) {
                    onError(error);
                };
                promise.then(successCallback, errorCallback);
                return promise;
            }
        };
    });

    beforeEach(inject(function($rootScope, _$log_, $q) {
        // The injector unwraps the underscores (_) from around the parameter names when matching
        rootScope = $rootScope;
        scope = rootScope.$new();
        log = _$log_;
        q = $q;
    }));

    it("should fetch the latest comic from xkcd", inject(function($controller) {
        stateParams = {id: "latest"};
        comicController = $controller("ComicController", {
            $rootScope: rootScope,
            $scope: scope,
            $stateParams: stateParams,
            $log: log,
            comicService: comicService
        });
        // fulfill the promise successfully
        deferred.resolve();
        scope.$apply();
        expect(scope.comic).not.toBe(undefined);
        expect(scope.comic.num).toBe(1438);
        expect(rootScope.latest).not.toBe(undefined);
        expect(rootScope.latest.num).toBe(1438);
    }));

    it("should fetch comic 1436 from xkcd", inject(function($controller) {
        stateParams = {id: 1436};
        comicController = $controller("ComicController", {
            $rootScope: rootScope,
            $scope: scope,
            $stateParams: stateParams,
            $log: log,
            comicService: comicService
        });
        // fulfill the promise successfully
        deferred.resolve();
        scope.$apply();
        expect(scope.comic).not.toBe(undefined);
        expect(scope.comic.num).toBe(1436);
        expect(rootScope.latest).toBe(undefined);
    }));

    it("should try and fetch comic 1500 from xkcd which is missing", inject(function($controller) {
        stateParams = {id: 1500};
        comicController = $controller("ComicController", {
            $rootScope: rootScope,
            $scope: scope,
            $stateParams: stateParams,
            $log: log,
            comicService: comicService
        });
        var error = {status: 404, config: {url: "http://dynamic.xkcd.com/api-0/jsonp/comic/1500?callback=JSON_CALLBACK"}};
        // fulfill the promise unsuccessfully - with an error
        deferred.reject(error);
        scope.$apply();
        // Assert that the log contains specific messages as well if you like.
        angular.forEach(log.error.logs, function(value) {
            expect(log.error.logs).toContain(["Error getting comic 1500. Status 404: http://dynamic.xkcd.com/api-0/jsonp/comic/1500?callback=JSON_CALLBACK"]);
        });
        expect(scope.comic).toBe(undefined);
        expect(rootScope.latest).toBe(undefined);
        expect(scope.error).toBe(error);
    }));
});
