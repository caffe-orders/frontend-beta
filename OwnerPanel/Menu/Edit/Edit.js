angular.module('app.OwnerPanelMenuEditView', [
  'ngRoute',
  'ui.bootstrap'
])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.
    when('/owner/:placeId/menu/edit/:menuId', {
      templateUrl: 'OwnerPanel/Menu/Edit/Edit.html',
      controller: 'OwnerPanelMenuEditCtrl'
    })
}])

.controller('OwnerPanelMenuEditCtrl', ['$scope', '$routeParams', '$rootScope',
  function($scope, $routeParams, $rootScope) {
    //init base data
    var placeId = $routeParams.placeId;
    $scope.ownerUrl = 'owner/' + placeId + '/';
    $rootScope.title = 'Панель владельца | CaffeOrders';
    
    
}]);