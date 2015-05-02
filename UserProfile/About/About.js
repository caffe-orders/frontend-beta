angular.module('app.UserProfileAboutView', [
  'ngRoute',
  'ui.bootstrap',
  'ngSanitize',
  'app.AuthService'
])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.
    when('/user/:userId/about/', {
      templateUrl: 'UserProfile/About/About.html',
      controller: 'UserProfileAboutCtrl'
    }).
    when('/user/:userId/', {
      redirectTo: '/user/:userId/about'
    })
}])

.controller('UserProfileAboutCtrl', ['$scope', '$routeParams', '$http', '$location', '$sce', '$rootScope', 'AuthService',
  function($scope, $routeParams, $http, $location, $sce, $rootScope, AuthService) {
    //init base data
    $scope.userId = $routeParams.userId;
    $scope.userUrl = 'user/' + $routeParams.userId + '/';
    
    $scope.userData = angular.fromJson(localStorage.getItem('user'));
    $rootScope.title = 'Профиль | CaffeOrders';
}]);