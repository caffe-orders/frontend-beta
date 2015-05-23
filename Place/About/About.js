angular.module('App.PlaceAbout', [
  'ngRoute',
  'ui.bootstrap',
  'ngSanitize'
])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.
    when('/place/:placeId/about/', {
      templateUrl: 'Place/About/About.html',
      controller: 'PlaceAboutCtrl'
    }).
    when('/place/:placeId/', {
      templateUrl: 'Place/About/About.html',
      controller: 'PlaceAboutCtrl'
    })
}])

.controller('PlaceAboutCtrl', ['$scope', '$routeParams', '$sce', 'ApiRequest',
  function($scope, $routeParams, $sce, ApiRequest) {
    $scope.placeUrl = 'place/' + $routeParams.placeId + '/';
    
		var getPlaceData = function(placeId) {
			var reqUrl = 'places/info?id=' + placeId;
			console.log('get place data by id ' + placeId);
			ApiRequest.get(reqUrl, true)
			.success(function(data, state) {
				console.log('place data recieved');
				$scope.place = data;
			})
			.error(function(data, state) {
				console.log('api returnd error while loading place data');
			});
		}
		
		getPlaceData($routeParams.placeId);
}]);