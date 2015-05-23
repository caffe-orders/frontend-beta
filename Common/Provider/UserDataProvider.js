angular.module('App.UserDataProvider', [])
.factory('UserData', ['ApiRequest', function(ApiRequest) {
	var user = {
		api: ApiRequest,
		data: {},
		isLogged: false,
		setData: function(data) {
			user.data = data;
			user.cacheUserData(data);
		},
		cacheUserData: function(data) {
			if(localStorage) {
				localStorage.setItem('userData', angular.toJson(data));
			}
		},
		getDataFromCache: function() {
			var getDataFromApi = function() {
				var userData = null;
				user.api.get('users/current', false)
				.success(function(data, state) {
					console.log('api return user data');
					userData = data;
					console.log('user data' + data);
				})
				.error(function(data, state) {
					console.log('api return user is not logged in');
				});
			}
			console.log('try to get user data from cache');
			if(localStorage) {
				console.log('localStorage support accepted');
				if(localStorage.getItem('userData')) {
					console.log('have cache data');
					return localStorage.getItem('userData');
				} else {
					console.log('no cache data, try to get data from api');
				}
			} else {
				console.log('no localStorage support, try to get data from api');
				return getDataFromApi();
			}
		}
	}
	user.getDataFromCache();
	return user;
}]);
