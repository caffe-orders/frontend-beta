angular.module('App.UserProfileStat', [
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

.controller('UserProfileStatCtrl', ['$scope', '$routeParams',
  function($scope, $routeParams, $http, $location, $sce, $rootScope) {
	//init base data
	$scope.userId = $routeParams.userId;
	$scope.userUrl = 'user/' + $routeParams.userId + '/';
}]);
