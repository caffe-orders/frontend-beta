angular.module('app.OwnerPanelPlaceView', [
  'ngRoute',
  'ui.bootstrap',
  'ngSanitize'
])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.
    when('/owner/:ownerId/place/', {
      templateUrl: 'OwnerPanel/Place/Place.html',
      controller: 'OwnerPanelPlaceCtrl'
    })
}])

.controller('OwnerPanelPlaceCtrl', ['$scope', '$routeParams', '$http', '$location', '$sce', '$rootScope',
  function($scope, $routeParams, $http, $location, $sce, $rootScope) {
    //init base data
    var ownerId = $routeParams.ownerId;
    $scope.ownerUrl = 'owner/' + ownerId + '/';
    $rootScope.title = 'Панель владельца | CaffeOrders';
    
    
}]);