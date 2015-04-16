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

.controller('OwnerPanelMenuCreateCtrl', ['$scope', '$routeParams', '$rootScope',
  function($scope, $routeParams, $rootScope) {
    //init base data
    var placeId = $routeParams.placeId;
    $scope.ownerUrl = 'owner/' + placeId + '/';
    $rootScope.title = 'Панель владельца | CaffeOrders';
    
    
}]);