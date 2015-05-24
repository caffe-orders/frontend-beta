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
  function($scope, $routeParams, ApiRequest, UserData) {
	//init base data
	$scope.userId = $routeParams.userId;
	$scope.userUrl = 'user/' + $routeParams.userId + '/';

	$scope.unameChangeForm = {
		firstName: null,
		lastName: null,
		change: function() {
			if(true) {
				ApiRequest.post('users/changeuname', {
					'firstname': $scope.unameChangeForm.firstName,
					'lastname': $scope.unameChangeForm.lastName
				}, false)
				.success(function(data, state) {
					if(state == 200) {
						var user = UserData.data;
						user.firstName = $scope.unameChangeForm.firstName;
						user.lastName = $scope.unameChangeForm.lastName;
						UserData.setData(user);
						console.log('user data edited');
						alert('Ваши данные успешно изменены');
					}
				})
				.error(function(data, state) {
					alert('Произошла ошибка при изменении данных, попробуйте позже');
				});
			} else {
				console.log('wrong name format');
				alert('Слишком длинное/короткое имя/фамилия');
			}
		}
	};
}]);
