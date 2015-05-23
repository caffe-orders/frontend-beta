angular.module('App.PlaceMenu', [
  'ngRoute',
  'ui.bootstrap'
])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.
    when('/place/:placeId/menu/', {
      templateUrl: 'Place/Menu/Menu.html',
      controller: 'PlaceMenuCtrl'
    })
}])

.controller('PlaceMenuCtrl', ['$scope', '$routeParams', 'ApiRequest',
  function($scope, $routeParams, ApiRequest) {
    //init base data
    $scope.placeUrl = 'place/' + $routeParams.placeId + '/';
    
    $scope.menuPanel = {
			data: {},
      state: {
        'noData': false
      },
      currCat: null,
      changeCat: function(catId) {
        $scope.menuPanel.currCat = $scope.menuPanel.getCatById(catId);
      },
      getCatById: function(id) {
        var hid = -1;
        for(var catKey in $scope.menuPanel.data) {
          hid++;
          if(hid == id) return $scope.menuPanel.data[catKey];
        }
      },
			init: function(placeId) {
				var reqUrl = 'menu/list?placeId=' + $routeParams.placeId;
				console.log('try to load menu data');
				ApiRequest.get(reqUrl, true)
				.success(function(data, state) {
					console.log('menu data loaded');
					$scope.menuPanel.data = data;
					$scope.menuPanel.currCat = $scope.menuPanel.getCatById(0);
				})
				.error(function(data, state) {
					console.log('api return error while loaded menu data');
					$scope.menuPanel.state.noData = true;
				});
			}
    }
    $scope.menuPanel.init($routeParams.placeId);
}]);