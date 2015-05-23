angular.module('App.UserProfileAbout', [
  'ngRoute',
  'ui.bootstrap',
  'ngSanitize',
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

.controller('UserProfileAboutCtrl', ['$scope', '$routeParams', 'UserData',
function($scope, $routeParams, UserData) {

	$scope.userId = $routeParams.userId;
	$scope.userUrl = 'user/' + $routeParams.userId + '/';
	$scope.userData = UserData.data;
	console.log(UserData);
	console.log($scope.userData);
}]);
