angular.module('App.OwnerPanelOrderCheck', [
  'ngRoute',
  'ui.bootstrap'
])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.
    when('/owner/:placeId/index/', {
      templateUrl: 'OwnerPanel/OrderCheck/OrderCheck.html',
      controller: 'OwnerPanelOrderCheckCtrl'
    }).
    when('/owner/:placeId/', {
      redirectTo: '/owner/:placeId/index/'
    })
}])

.controller('OwnerPanelOrderCheckCtrl', ['$scope', '$routeParams', '$rootScope',
  function($scope, $routeParams, $rootScope) {
    //init base data
    var placeId = $routeParams.placeId;
    $scope.ownerUrl = 'owner/' + placeId + '/';
    $rootScope.title = 'Панель владельца | CaffeOrders';
    
    
}]);