'use strict';

// Declare app level module which depends on views, and components
var module = angular.module('StoreFrontApp', [
    'ngRoute',
    'StoreFrontApp.AppConfigService',
    'StoreFrontApp.ItemDBService',
    'StoreFrontApp.IndexController',
    'StoreFrontApp.NewOrder',
    'StoreFrontApp.OrderHistory'
])
.config(['$locationProvider', '$routeProvider', '$httpProvider', function($locationProvider, $routeProvider, $httpProvider) {
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
    $locationProvider.hashPrefix('!');
    $routeProvider.otherwise({redirectTo: '/order'});
}]);
