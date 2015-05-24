angular.module('App.UserProfileChangePass', [
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

.controller('UserProfileChangePassCtrl', ['$scope', '$routeParams', 'ApiRequest',
 function($scope, $routeParams, ApiRequest) {
	//init base data
	$scope.userId = $routeParams.userId;
	$scope.userUrl = 'user/' + $routeParams.userId + '/';

	$scope.passChangeForm = {
		oldPass: null,
		newPass: null,
		repeatedPass: null,
		change: function() {
			if((/^((\d)|(\w)){5,18}$/).test($scope.passChangeForm.oldPass) && (/^((\d)|(\w)){5,18}$/).test($scope.passChangeForm.newPass)) {
				if($scope.passChangeForm.newPass === $scope.passChangeForm.repeatedPass) {
					ApiRequest.post('users/changepass/', {
						'oldpass': $scope.passChangeForm.oldPass,
						'newpass': $scope.passChangeForm.newPass
					}, false)
					.success(function(data, state) {
						console.log('password changed');
						alert('Ваш пароль успешно изменен');
					})
					.error(function(data, state) {
						console.log('api return arror while trying to change user password');
						alert('Возникла ошибка при изменении пароля, попробуйте позже');
					});
				} else {
					console.log('passwords must me similar' + $scope.passChangeForm.newPass + $scope.passChangeForm.repeatedPass);
					alert('Введенные пароли не совпадают');
				}
			}
			else {
				console.log('wrong pass format');
				alert('Ваш пароль успешно изменен');
			}
		}
	}
}]);
