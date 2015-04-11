angular.module('app.OwnerPanelMenuBaseEditView', [
  'ngRoute'
])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.
    when('/owner/:placeId/menu/edit', {
      templateUrl: 'OwnerPanel/Menu/Edit/Base/Base.html',
      controller: 'OwnerPanelMenuBaseEditCtrl'
    })
}])

.controller('OwnerPanelMenuBaseEditCtrl', ['$scope', '$routeParams', '$rootScope',
  function($scope, $routeParams, $rootScope) {
    //init base data
    var placeId = $routeParams.placeId;
    $scope.ownerUrl = 'owner/' + placeId + '/';
    $rootScope.title = 'Панель владельца | CaffeOrders';
    
    
}]);