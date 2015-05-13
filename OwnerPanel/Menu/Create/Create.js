angular.module('app.OwnerPanelMenuCreateView', [
  'ngRoute',
  'ui.bootstrap'
])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.
    when('/owner/:placeId/menu/', {
      templateUrl: 'OwnerPanel/Menu/Create/Create.html',
      controller: 'OwnerPanelMenuCreateCtrl'
    })
}])

.controller('OwnerPanelMenuCreateCtrl', ['$scope', '$routeParams', '$rootScope', '$http',
  function($scope, $routeParams, $rootScope, $http) {
    //init base data
    var placeId = $routeParams.placeId;
    $scope.ownerUrl = 'owner/' +  $routeParams.placeId + '/';
    $rootScope.title = 'Панель владельца | CaffeOrders';
    $scope.dish = {
      
    }
}]);