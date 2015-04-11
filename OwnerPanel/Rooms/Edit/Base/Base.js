angular.module('app.OwnerPanelRoomBaseEditView', [
  'ngRoute'
])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.
    when('/owner/:placeId/rooms/edit', {
      templateUrl: 'OwnerPanel/Rooms/Edit/Base/Base.html',
      controller: 'OwnerPanelRoomBaseEditCtrl'
    })
}])

.controller('OwnerPanelRoomBaseEditCtrl', ['$scope', '$routeParams', '$rootScope',
  function($scope, $routeParams, $rootScope) {
    //init base data
    var placeId = $routeParams.placeId;
    $scope.ownerUrl = 'owner/' + placeId + '/';
    $rootScope.title = 'Панель владельца | CaffeOrders';
    
    
}]);