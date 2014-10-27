'use strict';

var xkcdApp = angular.module('xkcdApp',['ui.bootstrap', 'ui.router', 'ngResource', 'ngAnimate', 'xkcdApp.controllers','xkcdApp.services']);

xkcdApp.config(function($stateProvider) {
    $stateProvider.state('about', {
        url:'/about',
        templateUrl:'partials/about.html',
        controller:'aboutController'
    }).state('comic', {
        url:'/comics/:id',
        templateUrl:'partials/comic.html',
        controller:'comicController'
    });
}).run(function($state) {
    $state.go('comic', {id: 'latest'});
});