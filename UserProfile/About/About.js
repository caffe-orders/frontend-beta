angular.module('app.UserProfileAboutView', [
  'ngRoute',
  'ui.bootstrap',
  'ngSanitize'
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

.controller('UserProfileAboutCtrl', ['$scope', '$routeParams', '$http', '$location', '$sce', '$rootScope',
  function($scope, $routeParams, $http, $location, $sce, $rootScope) {
    //init base data
    $scope.userId = $routeParams.userId;
    $scope.userUrl = 'user/' + $routeParams.userId + '/';
    
    //get all needed data about place (json)
    $http.get('tmp/user.json').success(function(data) {
      $scope.userData = data;
      $rootScope.title = 'Профиль | CaffeOrders';
    });
}]);