angular.module('App.SendFileProvider', [])
.factory('SendFile', ['$http', 'ApiRequest', function($http, ApiRequest) {
	var sendFile = function(fileData) {
		console.log('try to send file');
		var req = ApiRequest.post('filestoken/add', {
			lifeTime: 50
		}, false)
		.success(function(data, state) {
			console.log('token');

			var formData = new FormData();
			formData.append('sessionHash', data.sessionHash);
			formData.append('token', data.token);
			formData.append('file', fileData.file);
			formData.append('path', fileData.path);
			formData.append('fileName', fileData.name);
			formData.append('fileType', fileData.type);

			var fileSendingRequest = $http.post('//files.caffe.ru/download.php' , formData, {
				transformRequest: angular.identity,
				headers: {
					'Content-Type': undefined
				}
			})
			.success(function(data, state) {
				console.log('file sendend');
			})
			.error(function(data, state) {
				console.log('file server return error');
			});
		})
		.error(function(data, state) {
			console.log('sending file error');
		});
		return req;
	}
	return sendFile;
}]);
