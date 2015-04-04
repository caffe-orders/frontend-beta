angular.module('app.OwnerPanelIndexView', [
  'ngRoute',
  'ui.bootstrap',
  'ngSanitize'
])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.
    when('/owner/:ownerId/index/', {
      templateUrl: 'OwnerPanel/Index/Index.html',
      controller: 'OwnerPanelIndexCtrl'
    }).
    when('/owner/:ownerId/', {
      redirectTo: '/owner/:ownerId/index/'
    })
}])

.controller('OwnerPanelIndexCtrl', ['$scope', '$routeParams', '$http', '$location', '$sce', '$rootScope',
  function($scope, $routeParams, $http, $location, $sce, $rootScope) {
    //init base data
    var ownerId = $routeParams.ownerId;
    $scope.ownerUrl = 'owner/' + ownerId + '/';
    $rootScope.title = 'Панель владельца | CaffeOrders';
    
    
}]);