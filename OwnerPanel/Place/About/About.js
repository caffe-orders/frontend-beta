angular.module('App.OwnerPanelPlaceAbout', [
	'ngRoute',
	'ui.bootstrap',
	'App.FileModel'
])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.
	when('/owner/:placeId/place/', {
	  templateUrl: 'OwnerPanel/Place/About/About.html',
	  controller: 'OwnerPanelPlaceAboutCtrl'
	})
}])

.controller('OwnerPanelPlaceAboutCtrl', ['$scope', '$routeParams', 'ApiRequest', 'SendFile',
  function($scope, $routeParams, ApiRequest, SendFile) {
	//init base data
	$scope.ownerUrl = 'owner/' +  $routeParams.placeId + '/';
	$scope.placeModel = {
		edit: function(place) {
			ApiRequest.post('places/edit', {
				placeId: $routeParams.placeId,
				name: place.name,
				gmap: place.gmap,
				address: place.address,
				phones: place.phones,
				avgBill: place.avgBill,
				workTime: place.workTime,
				descr: place.descr,
				type: place.type,
				outdoors: ((place.outdoors) ? 1 : 0),
				cuisine: place.cuisine,
				parking: ((place.parking) ? 1 : 0),
				smoking: ((place.smoking) ? 1 : 0),
				wifi: ((place.wifi) ? 1 : 0),
				avgBill: place.avgBill
			}, false)
			.success(function(data) {
				console.log('edit success');
				alert('Данные изменены');
			})
			.error(function() {
				alert('Не удалось изменить данные');
				console.log('api return error while trying to edit place data');
			});
		},
		getBaseData: function(placeId) {
			var reqUrl = 'places/info?id=' + placeId;
			ApiRequest.get(reqUrl, false)
			.success(function(data, state) {
				console.log('base data loaded');
				$scope.place = data;
			})
			.error(function(data, state) {
				alert('Сервера не отвечают, попробуйте выполнить операцию позже');
			});
		},
		editPreviewImage: function(){
			var fileData = {
				file: $scope.imgUploadForm.file,
				path: 'places/' + $routeParams.placeId,
				type: 'previewPlace',
				name: 'prev.jpg'
			}
		SendFile(fileData);
		}
	}
	$scope.placeModel.getBaseData($routeParams.placeId);
}]);
