'use strict';

angular.module('StoreFrontApp.OrderHistory', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/history', {
    templateUrl: 'orderhistory/OrderHistory.html',
    controller: 'OrderHistoryController'
  });
}])

.controller('OrderHistoryController', ['$scope', '$http', function($scope, $http) {
    $scope.title = "Order History"
}]);
