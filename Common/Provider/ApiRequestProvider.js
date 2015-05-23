angular.module('App.ApiRequestProvider', []).factory('ApiRequest', ['$http', function($http) {
	var apiRequest = {
		get: function(url, cache) {
			//cache not implemented
			var req = {
				method: 'GET',
				url: '//api.caffe.ru/' + url,
				crossDomain: true,
				withCredentials: true,
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded'
				}
			};
			return $http(req);
		},
		post: function(url, data, cache) {
			//cache not implemented
			var req = {
				method: 'POST',
				url: '//api.caffe.ru/' + url,
				crossDomain: true,
				withCredentials: true,
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded'
				},
				data: data
			};
			return $http(req);
		},
		auth: function(url, data, cache) {
			//cache not implemented
			var req = {
				method: 'POST',
				url: '//api.caffe.ru/' + url,
				withCredentials: true,
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded'
				},
				data: data
			};
			return $http(req);
		}
	}
	return apiRequest;
}]);
