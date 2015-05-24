angular.module('App.PlacesListIndex', [
	'ngRoute',
	'ui.bootstrap'
])
.config(['$routeProvider', function($routeProvider) {
	$routeProvider.when('/list/:pageNo/', {
		templateUrl: 'PlacesList/Index/Index.html',
		controller: 'PlacesListIndexCtrl'
	});
}])
.controller('PlacesListIndexCtrl', ['$scope', '$routeParams', 'ApiRequest', '$location',
	function($scope, $routeParams, ApiRequest, $location) {
	 //init base data to previews list
		$scope.switcher = true;
		$scope.pagination = {
			'totalItems': 999999,
			'currentPage': 1,
			'maxSize': 7,
			'onPageChanged': function() {
				if($scope.switcher == true) {
					var reqUrl = 'places/list?limit=12&offset=' + ($scope.pagination.currentPage - 1) * 12;
					ApiRequest.get(reqUrl, false)
						.success(function(data) {
						if(!data) {
							alert('Нет данных');
						}
						else {
							$scope.PlacePreviewsList = data;
							console.log(data);
							$location.path('list/' + $scope.pagination.currentPage + '/');
						}
					});
				} else {
					$scope.searchPlace($scope.search);
				}
			}
		}
		$scope.setPage = function(pageNo) {
			$scope.pagination.currentPage = pageNo;
		};
		$scope.setPage($routeParams.pageNo);
		$scope.pagination.onPageChanged();

		//rating
		$scope.max = 5;
		$scope.isReadonly = true;

		$scope.hoveringOver = function(value) {
			$scope.overStar = value;
			$scope.percent = 100 * (value / $scope.max);
		};

		$scope.ratingStates = [
			{stateOn: 'b-rating_star', stateOff: 'b-rating_star__empty'}
		];

		$scope.ratePlace = function(placeId, mark) {
			var req = {
					method: 'POST',
					url: '//api.caffe.ru/places/rate',
					withCredentials: true,
					data: {
						'placeId': placeId,
						'mark': mark
					},
					headers: { 'Content-Type': 'application/x-www-form-urlencoded'}
				};
				$http(req).success(function(data) {
					console.log('set mark ' + mark + ' for place ' + placeId);
					$scope.pagination.onPageChanged();
				});
		};

		$scope.searchPlace = function(search) {
			reqUrl = 'places/search?';
			reqUrl = reqUrl + 'wifi=' + search.wifi;
			reqUrl = reqUrl + '&outdoors=' + search.outdoors;
			reqUrl = reqUrl + '&parking=' + search.parking;
			reqUrl = reqUrl + '&type=' + search.type;
			reqUrl = reqUrl + '&smoking=' + search.smoking;
			reqUrl = reqUrl + '&cuisine=' + search.cuisine;
			reqUrl = reqUrl + '&limit=12';
			reqUrl = reqUrl + '&offset=' + ($scope.pagination.currentPage - 1) * 12;
			ApiRequest.get(reqUrl, false)
			.success(function(data, state) {
				if(state != 204) {
					$scope.PlacePreviewsList = data;
					$location.path('list/' + $scope.pagination.currentPage + '/');
					$scope.switcher = false;
				} else {
					alert('Поиск не дал результатов');
				}
			})
			.error(function(data, state) {
				$scope.PlacePreviewsList = {};
			});
			console.log($scope.switcher);
		}
}]);
