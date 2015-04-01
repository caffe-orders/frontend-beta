angular.module('app.TableReserveView', [
  'ngRoute',
  'ui.bootstrap'
])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/table/reserve/:placeId/:roomNo', {
    templateUrl: 'Table/Reserve/Reserve.html',
    controller: 'TableReserveCtrl'
  })
}])

.controller('TableReserveCtrl', ['$scope', '$routeParams', '$http', '$location', '$rootScope',
  function($scope, $routeParams, $http, $location, $rootScope) {
    //init base data
    $scope.placeUrl = 'place/' + $routeParams.placeId + '/';
}]);