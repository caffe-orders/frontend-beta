angular.module('app.OwnerPanelPlaceView', [
  'ngRoute',
  'ui.bootstrap',
  'ngSanitize'
])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.
    when('/owner/:placeId/place/', {
      templateUrl: 'OwnerPanel/Place/Place.html',
      controller: 'OwnerPanelPlaceCtrl'
    })
}])

.controller('OwnerPanelPlaceCtrl', ['$scope', '$routeParams', '$http', '$location', '$sce', '$rootScope',
  function($scope, $routeParams, $http, $location, $sce, $rootScope) {
    //init base data
    var placeId = $routeParams.placeId;
    $scope.ownerUrl = 'owner/' + placeId + '/';
    $rootScope.title = 'Панель владельца | CaffeOrders';
    
    
}]);