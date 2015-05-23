angular.module('App.UserProfileSettings', [
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

.controller('UserProfileSettingsCtrl', ['$scope', '$routeParams',
function($scope, $routeParams, $http, $location, $sce, $rootScope) {
	//init base data
	$scope.userId = $routeParams.userId;
	$scope.userUrl = 'user/' + $routeParams.userId + '/';
}]);
