angular.module('app.OwnerPanelRoomEditView', [
  'ngRoute',
  'ui.bootstrap'
])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.
    when('/owner/:placeId/rooms/edit/:roomId', {
      templateUrl: 'OwnerPanel/Rooms/Edit/Edit.html',
      controller: 'OwnerPanelRoomEditCtrl'
    })
}])

.controller('OwnerPanelRoomEditCtrl', ['$scope', '$routeParams', '$rootScope',
  function($scope, $routeParams, $rootScope) {
    //init base data
    var placeId = $routeParams.placeId;
    $scope.ownerUrl = 'owner/' + placeId + '/';
    $rootScope.title = 'Панель владельца | CaffeOrders';
    
    
}]);