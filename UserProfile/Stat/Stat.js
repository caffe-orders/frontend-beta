angular.module('app.UserProfileStatView', [
  'ngRoute',
  'ui.bootstrap',
  'ngSanitize'
])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.
    when('/user/:userId/stat/', {
      templateUrl: 'UserProfile/Stat/Stat.html',
      controller: 'UserProfileStatCtrl'
    })
}])

.controller('UserProfileStatCtrl', ['$scope', '$routeParams', '$http', '$location', '$sce', '$rootScope',
  function($scope, $routeParams, $http, $location, $sce, $rootScope) {
    //init base data
    $scope.userId = $routeParams.userId;
    $scope.userUrl = 'user/' + $routeParams.userId + '/';
    
    //get all needed data about place (json)
    $http.get('tmp/user.json').success(function(data) {
      $scope.userData = data;
      $rootScope.title = 'Статистика | CaffeOrders';
    });
}]);