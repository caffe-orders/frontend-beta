angular.module('App.PlaceOrderTable', [
  'ngRoute',
  'ui.bootstrap'
])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/place/:placeId/tables', {
	templateUrl: 'Place/Order/Table/Table.html',
	controller: 'PlaceOrderTableCtrl'
  })
}])

.controller('PlaceOrderTableCtrl', ['$scope', '$routeParams', 'ApiRequest', 'NotifyPanel', '$rootScope',
function($scope, $routeParams, ApiRequest, $rootScope) {
	//init base data
	$scope.placeUrl = 'place/' + $routeParams.placeId + '/';
	$scope.placeId = $routeParams.placeId;
	$scope.reserveTablePanel = {
		state: {
			noData: false
		},
		rooms: {
			data: { },
			getRoomsList: function(placeId) {
				ApiRequest.get('tables/publiclist?placeId=' + $routeParams.placeId + '&roomId=' + $scope.reserveTablePanel.rooms.currRoom, false)
				.success(function(data, state) {
					if(state == 200) {
						console.log('tables list loaded');
						console.log(data);
						$scope.reserveTablePanel.rooms.data = data;
					} else {
						console.log('no data in tables list');
						$scope.reserveTablePanel.state.noData = true;
					}
				});
			},
			currRoom: 0,
			get: function() {
				var roomId = $scope.reserveTablePanel.rooms.currRoom;
				return ($scope.reserveTablePanel.rooms.data[roomId] != null) ?
					$scope.reserveTablePanel.rooms.data[roomId] : $scope.reserveTablePanel.rooms.data[0];
			},
			prev: function() {
				console.log($scope.reserveTablePanel.rooms.currRoom);
				console.log($scope.reserveTablePanel.rooms.data[$scope.reserveTablePanel.rooms.currRoom].tablesList);
				if($scope.reserveTablePanel.rooms.currRoom > 0) {
					$scope.reserveTablePanel.rooms.currRoom--;
				}
				  else {
					$scope.reserveTablePanel.rooms.currRoom = $scope.reserveTablePanel.rooms.data.length - 1;
				}
			},
			next: function() {
				console.log($scope.reserveTablePanel.rooms.currRoom);
				if($scope.reserveTablePanel.rooms.currRoom < ($scope.reserveTablePanel.rooms.data.length - 1)) {
					$scope.reserveTablePanel.rooms.currRoom++;
				} else {
					$scope.reserveTablePanel.rooms.currRoom = 0;
				}
			}
		  },
		  table: {
			  activeBg: '#123213',
			  unactiveBg: '#228228',
			  setBg: function(active) {
				  if(active == true) {
					  return this.activeBg;
				  } else {
					  return this.unactiveBg;
				  }
			  },
			  reserve: function(table) {
				  if(table.active) {
					  ApiRequest.post('orders/new', {
						  'tableId': table.id
					  }, false)
					  .success(function(data, state) {
						  console.log('table ordered');
						  alert('Заказ на столик отправлен на обработку');
						  $rootScope.notifyPanelExpand = true;
						  $rootScope.notifyBtnExpand = true;
					  })
					  .error(function(data, state) {
						  console.log('table order error');
						  alert('Возникла ошибка при заказе столика, возможно столик уже забронирован.\n Попробуйте позже');
					  });
				  }
			  }
		  }
	}
	$scope.reserveTablePanel.rooms.getRoomsList(5);
}]);
