angular.module('App.UserProfileChangeUname', [
  'ngRoute',
  'ui.bootstrap',
  'ngSanitize'
])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.
	when('/user/:userId/change/uname/', {
	  templateUrl: 'UserProfile/Change/Uname/Uname.html',
	  controller: 'UserProfileChangeUnameCtrl'
	})
}])

.controller('UserProfileChangeUnameCtrl', ['$scope', '$routeParams', 'ApiRequest', 'UserData',
  function($scope, $routeParams, $http, $location, $sce, $rootScope) {
	//init base data
	$scope.userId = $routeParams.userId;
	$scope.userUrl = 'user/' + $routeParams.userId + '/';

	$scope.unameChangeForm = {
		firstName: null,
		lastName: null,
		change: function() {
			if(true) {
			ApiRequest.post('/changeuname', {
				'firstname': $scope.unameChangeForm.firstName,
				'lastname': $scope.unameChangeForm.lastName
			}, false)
			.success(function(data, state) {
				if(state == 200) {
					var user = UserData.data;
					user.firstName = $scope.unameChangeForm.firstName;
					user.lastName = $scope.unameChangeForm.lastName;
					UserData.setData(user);
				}
			});
		} else {
			console.log('wrong name format');
		}
	  }
	};
}]);
