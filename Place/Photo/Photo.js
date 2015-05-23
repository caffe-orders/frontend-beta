angular.module('App.PlacePhoto', [
  'ngRoute',
  'ui.bootstrap'
])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.
    when('/place/:placeId/photo/', {
      templateUrl: 'Place/Photo/Photo.html',
      controller: 'PlacePhotoCtrl'
    })
}])

.controller('PlacePhotoCtrl', ['$scope', '$routeParams', 'ApiRequest',
  function($scope, $routeParams, ApiRequest) {
    //init base data
    $scope.placeId = $routeParams.placeId;
    $scope.placeUrl = 'place/' + $routeParams.placeId + '/';
    
    $scope.album = {
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