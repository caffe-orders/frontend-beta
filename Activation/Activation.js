angular.module('app.ActivationView', [
  'ngRoute'
])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.
    when('/activation/:hash', {
      templateUrl: 'Activation/Activation.html',
      controller: 'ActivationCtrl'
    })
}])

.controller('ActivationCtrl', ['$rootScope', '$scope', '$routeParams',
  function($rootScope, $scope, $routeParams) {
    //init base data
    $rootScope.title = 'Активация | CaffeOrders';
    $scope.hash = $routeParams.hash;
    
}]);