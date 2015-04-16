angular.module('app.OwnerPanelRoomCreateView', [
  'ngRoute',
  'ui.bootstrap'
])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.
    when('/owner/:placeId/rooms/', {
      templateUrl: 'OwnerPanel/Rooms/Create/Create.html',
      controller: 'OwnerPanelRoomCreateCtrl'
    })
}])

.controller('OwnerPanelRoomCreateCtrl', ['$scope', '$routeParams', '$rootScope',
  function($scope, $routeParams, $rootScope) {
    //init base data
    var placeId = $routeParams.placeId;
    $scope.ownerUrl = 'owner/' + placeId + '/';
    $rootScope.title = 'Панель владельца | CaffeOrders';
    
    
}]);