angular.module('App.UserProfileChangePhone', [
  'ngRoute',
  'ui.bootstrap',
  'ngSanitize'
])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.
	when('/user/:userId/change/phone/', {
	  templateUrl: 'UserProfile/Change/Phone/Phone.html',
	  controller: 'UserProfileChangePhoneCtrl'
	})
}])

.controller('UserProfileChangePhoneCtrl', ['$scope', '$routeParams', 'ApiRequest', 'UserData',
  function($scope, $routeParams, ApiRequest, UserData) {
	//init base data
	$scope.userId = $routeParams.userId;
	$scope.userUrl = 'user/' + $routeParams.userId + '/';

	$scope.phoneChangeForm = {
		oldPhone: null,
		newPhone: null,
		change: function() {
			if((/^\d{12}$/).test($scope.phoneChangeForm.oldPhone) && (/^\d{12}$/).test($scope.phoneChangeForm.newPhone)) {
				ApiRequest.post('users/changephone', {
					'oldphone': $scope.phoneChangeForm.oldPhone,
					'newphone': $scope.phoneChangeForm.newPhone,
				}, false)
				.success(function(data, state) {
					if(state == 200) {
						var oldUserData = UserData.data;
						oldUserData.phone = $scope.phoneChangeForm.newPhone;
						UserData.setData(oldUserData);
						console.log('user phone edited');
						alert('Ваш телефон успешно изменен');
					} else {
						console.log('magic was happend');
					}
				})
				.error(function(data, state) {
					alert('Произошла ошибка при изменении телефона, попробуйте позже');
				});;
			} else {
				console.log('wrong phone format');
				alert('Не верный формат телефона! (ex. 375928876450)');
			}
		}
	}
}]);
