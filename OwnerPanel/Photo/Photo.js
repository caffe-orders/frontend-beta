angular.module('App.OwnerPanelPhoto', [
	'ngRoute',
	'ui.bootstrap',
	'App.FileModel'
])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.
	when('/owner/:placeId/photo/', {
	  templateUrl: 'OwnerPanel/Photo/Photo.html',
	  controller: 'OwnerPanelPhotoCtrl'
	})
}])

.controller('OwnerPanelPhotoCtrl', ['$scope', '$routeParams', 'md5', 'ApiRequest', 'SendFile',
function($scope, $routeParams, md5, ApiRequest, SendFile) {
	$scope.placeId = $routeParams.placeId;
	$scope.ownerUrl = 'owner/' + $routeParams.placeId + '/';

	$scope.album = {
		add: function() {
			var fileData = {
				file: $scope.imgUploadForm.file,
				path: 'places/' + $routeParams.placeId + '/album',
				type: 'albumImg',
				name: md5((new Date()).toString()) + '.jpg'
			}
			SendFile(fileData)
			.success(function(data) {
				ApiRequest.post('albums/addimg', {
					placeId: $routeParams.placeId,
					url: fileData.path + '/' + fileData.name
				}, false)
				.success(function(data, state) {
					alert('Фото добавлено');
					console.log('photo added');
				})
				.error(function(data, state) {
					console.log('api return error while trying to add photo url to album');
				});
			})
			.error(function(data, state) {
				alert('При загрузке фото возникла ошибка');
			});
		},
		delete: function(urlToDelete) {
			if(confirm('Вы действительно хотите удалить это фото?')) {
				ApiRequest.post('albums/addimg', {
					placeId: $routeParams.placeId,
					url: urlToDelete
				}, false)
				.success(function(data, state) {
					alert('Фото удалено');
					console.log('photo deleted');
				  })
				.error(function(data, state) {
					console.log('api return error while trying to delete photo url from album');
				});
			}
			$scope.album.getImgList($routeParams.placeId);
		},
		getImgList: function(placeId) {
			console.log('try to load album data');
			var reqUrl = 'albums/list?placeId=' + $routeParams.placeId;
			ApiRequest.get(reqUrl, true)
			.success(function(data, state) {
				console.log('album data loaded');
				$scope.album.data = data;
				if(state == 204) {
					console.log('no data in albums url list');
					$scope.album.state.noData = true;
				} else {
					$scope.album.state.noData = false;
				}
			})
			.error(function(data, state) {
				console.log('api return error whali try to load album data');
				$scope.album.state.noData = true;
			});
		},
		showFullImg: function(imgId) {
			$scope.album.fullImgUrl = $scope.album.data[imgId];
		},
		state: {
			noData: false
		},
		data: [],
		fullImgUrl: null
	}
	$scope.album.getImgList($routeParams.placeId);
}]);
