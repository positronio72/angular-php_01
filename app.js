'use strict';

var myApp = angular.module('myApp', ['ngRoute', 'ui.bootstrap']);

myApp.run(function($rootScope) {
    $rootScope.userToUpdate = {};
});