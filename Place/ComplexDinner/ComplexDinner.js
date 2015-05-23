angular.module('App.PlaceComplexDinner', [
  'ngRoute'
])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.
    when('/place/:placeId/complex/', {
      templateUrl: 'Place/ComplexDinner/ComplexDinner.html',
      controller: 'PlaceComplexDinnerCtrl'
    })
}])

.controller('PlaceComplexDinnerCtrl', ['$scope', '$routeParams', 'ApiRequest',
  function($scope, $routeParams, ApiRequest) {
    //init base data
    $scope.placeUrl = 'place/' + $routeParams.placeId + '/';
    
		$scope.week = {
      day: new Date().getDay()
    }

		$scope.complexDinnerPanel = {
			state: {
				noData: false
			},
			dinnersList: {},
			getComplexDinnersList: function(placeId) {
				console.log('placeId = ' + placeId);
				var reqUrl = 'complexdinner/list?placeId=' + placeId;
				console.log('try to get comples dinners list');
    		ApiRequest.get(reqUrl, true)
				.success(function(data, state) {
					console.log('complex dinners list downloaded');
					$scope.complexDinnerPanel.dinnersList = data;
					if(state == 204) {
						console.log('no data in dinners list');
						$scope.complexDinnerPanel.state.noData = true;
					}
				})
				.error(function(data, state) {
					console.log('an error occured while loading dinner list');
				});
			}
		}
		$scope.complexDinnerPanel.getComplexDinnersList($routeParams.placeId);
}]);