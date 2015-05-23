angular.module('App.OwnerPanelPlaceRoomCreate', [
	'ngRoute',
	'ui.bootstrap'
])

.config(['$routeProvider', function($routeProvider) {
	$routeProvider.
		when('/owner/:placeId/rooms/', {
			templateUrl: 'OwnerPanel/Place/Room/Room.html',
			controller: 'OwnerPanelPlaceRoomCreateCtrl'
		})
}])

.controller('OwnerPanelPlaceRoomCreateCtrl', ['$scope', '$routeParams', '$rootScope',
	function($scope, $routeParams, $rootScope) {
		//init base data
		var placeId = $routeParams.placeId;
		$scope.ownerUrl = 'owner/' + placeId + '/';
		$rootScope.title = 'Панель владельца | CaffeOrders';


}]);
