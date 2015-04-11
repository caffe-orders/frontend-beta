angular.module('app.OwnerPanelIndexView', [
  'ngRoute'
])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.
    when('/owner/:placeId/index/', {
      templateUrl: 'OwnerPanel/Index/Index.html',
      controller: 'OwnerPanelIndexCtrl'
    }).
    when('/owner/:placeId/', {
      redirectTo: '/owner/:placeId/index/'
    })
}])

.controller('OwnerPanelIndexCtrl', ['$scope', '$routeParams', '$rootScope',
  function($scope, $routeParams, $rootScope) {
    //init base data
    var placeId = $routeParams.placeId;
    $scope.ownerUrl = 'owner/' + placeId + '/';
    $rootScope.title = 'Панель владельца | CaffeOrders';
    
    
}]);