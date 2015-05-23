angular.module('App.AuthProvider', [])
.factory('AuthProvider', ['ApiRequest', 'UserData', function(ApiRequest, UserData) {
	var authModel = {
		user: UserData,
		logIn: function(email, password) {
			console.log('try to auth');
			var req = ApiRequest.auth('auth/login', {
				email: email,
				password: password
			}, false)
			.success(function(data, state) {
				console.log('auth success ' + state)
				authModel.user.setData(data);
				authModel.user.isLogged = true;
			})
			.error(function(data, state) {
				console.log('auth error' + state)
				authModel.user.setData(null);
				authModel.user.isLogged = false;
			});
			return req;
		},
		register: function(phone, email, password) {
			console.log('try to register new account');
			var req = ApiRequest.auth('auth/register', {
				phone: phone,
				email: email,
				password: password
			}, false)
			.sucess(function(data, state) {
				console.log('register success' + state)
			})
			.error(function(data, state) {
				console.log('auth error' + state)
			});
			return req;
		}
	}
	return authModel;
}]);
