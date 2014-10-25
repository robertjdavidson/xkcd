'use strict';

var xkcdServices = angular.module('xkcdApp.services', ['ngResource']);

xkcdServices.factory('comicService', function($resource) {
    return $resource('http://dynamic.xkcd.com/api-0/jsonp/comic/:id?callback=JSON_CALLBACK', {id:'@_id'}, {
        byId: {
            method: 'JSONP'
        }
    });
});