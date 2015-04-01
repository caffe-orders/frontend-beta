angular.module('app.UserProfileChangePassView', [
  'ngRoute',
  'ui.bootstrap',
  'ngSanitize'
])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.
    when('/user/:userId/change/pass/', {
      templateUrl: 'UserProfile/Change/Pass/Pass.html',
      controller: 'UserProfileChangePassCtrl'
    })
}])

.controller('UserProfileChangePassCtrl', ['$scope', '$routeParams', '$http', '$location', '$sce', '$rootScope',
  function($scope, $routeParams, $http, $location, $sce, $rootScope) {
    //init base data
    $scope.userId = $routeParams.userId;
    $scope.userUrl = 'user/' + $routeParams.userId + '/';
    
    //get all needed data about place (json)
    $http.get('tmp/user.json').success(function(data) {
      $scope.userData = data;
      $rootScope.title = 'Сменить пароль | CaffeOrders';
    });
}]);