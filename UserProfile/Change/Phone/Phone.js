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
  function($scope, $routeParams, $http, $location, $sce, $rootScope) {
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
					} else {
						console.log('magic was happend');
					}
				});
			} else {
				console.log('wrong phone format');
			}
		}
	}
}]);
