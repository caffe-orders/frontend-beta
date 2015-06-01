angular.module('App.OwnerPanelOrderCheck', [
  'ngRoute',
  'ui.bootstrap'
])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.
	when('/owner/:placeId/index/', {
	  templateUrl: 'OwnerPanel/OrderCheck/OrderCheck.html',
	  controller: 'OwnerPanelOrderCheckCtrl'
	}).
	when('/owner/:placeId/', {
	  redirectTo: '/owner/:placeId/index/'
	})
}])

.controller('OwnerPanelOrderCheckCtrl', ['$scope', '$routeParams', 'ApiRequest',
  function($scope, $routeParams, ApiRequest) {
	//init base data
	var placeId = $routeParams.placeId;
	$scope.ownerUrl = 'owner/' + placeId + '/';

	ApiRequest.get('orders/list?placeId=' + $routeParams.placeId, false)
	.success(function(data, state) {
		$scope.data = data;
		console.log(data);
	});
}]);
