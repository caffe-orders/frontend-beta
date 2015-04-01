angular.module('app.UserProfileSettingsView', [
  'ngRoute',
  'ui.bootstrap',
  'ngSanitize'
])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.
    when('/user/:userId/settings/', {
      templateUrl: 'UserProfile/Settings/Settings.html',
      controller: 'UserProfileSettingsCtrl'
    })
}])

.controller('UserProfileSettingsCtrl', ['$scope', '$routeParams', '$http', '$location', '$sce', '$rootScope', 
  function($scope, $routeParams, $http, $location, $sce, $rootScope) {
    //init base data
    $scope.userId = $routeParams.userId;
    $scope.userUrl = 'user/' + $routeParams.userId + '/';
    
    //get all needed data about place (json)
    $http.get('tmp/user.json').success(function(data) {
      $scope.userData = data;
      $rootScope.title = 'Настройки | CaffeOrders';
    });
}]);