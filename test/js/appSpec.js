'use strict';

describe("xkcd tests", function() {

    var scope, stateParams, aboutController, comicController, comicService, q, deferred;
    beforeEach(module("xkcdApp.controllers"));
    //beforeEach(module("xkcdApp.services"));

    //set up the mock comic service
    beforeEach(function() {
        comicService = {
            name: "Comic",
            byId: function() {
                deferred = q.defer();
                return deferred.promise;
            }
        };
        console.log("comicService created " + JSON.stringify(comicService));
    });

    // inject the required services and instantiate the controller
    beforeEach(inject(function($rootScope, $log, $controller, $q) {
        console.log("comicService used " + JSON.stringify(comicService));
        scope = $rootScope.$new();
        stateParams = {};
        q = $q;
        aboutController = $controller("AboutController", {
            '$scope': scope
        });
        comicController = $controller("ComicController", {
            '$rootScope': $rootScope,
            '$scope': scope,
            '$stateParams': stateParams,
            '$log': $log,
            'Comic': comicService
        });
    }));

//    describe("AboutController", function() {
//        it("should have a message of hello", function() {
//            expect(aboutController.message).toBe("hello");
//        });
//    });

//    describe("ComicController", function() {
        it("should fetch the latest comic from xkcd", function() {
            console.log("comicService used again " + JSON.stringify(comicService));
            spyOn(comicService, 'byId')
//                .andCallThrough();
            comicController;
            deferred.resolve();
            scope.$root.$digest();
            expect(comicService.byId).toHaveBeenCalled();
        });
//    });
});
