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

.controller('PlaceOrderTableCtrl', ['$scope', '$routeParams', 'ApiRequest', '$rootScope',
function($scope, $routeParams, ApiRequest, $rootScope) {
	//init base data
	$scope.placeUrl = 'place/' + $routeParams.placeId + '/';
	$scope.placeId = $routeParams.placeId;
	$scope.tablePanel = {
		state: {
			noData: false
		},
		currRoom: 1,
		tablesList: {},
		roomsList: {},
		prev: function() {
			if($scope.tablePanel.currRoom > 0) {
				$scope.tablePanel.currRoom--;
			} else {
				$scope.tablePanel.currRoom = $scope.tablePanel.roomsList.length - 1;
			}
			console.log($scope.tablePanel.currRoom);
			$scope.tablePanel.getTablesList();
		},
		next: function() {
			if($scope.tablePanel.currRoom < ($scope.tablePanel.roomsList.length - 1)) {
				$scope.tablePanel.currRoom++;
			} else {
				$scope.tablePanel.currRoom = 0;
			}
			$scope.tablePanel.getTablesList();
			console.log($scope.tablePanel.currRoom);
		},
		getRoomsList: function() {
			var reqUrl = 'rooms/publiclist?placeId=' + $routeParams.placeId;
			ApiRequest.get(reqUrl, false)
			.success(function(data, state) {
				$scope.tablePanel.roomsList = data;
				$scope.tablePanel.getTablesList();
				console.log($scope.tablePanel.roomsList);
			});
		},
		getTablesList: function() {
			var reqUrl = 'tables/publiclist?placeId=' + $routeParams.placeId + '&roomId=' + $scope.tablePanel.roomsList[$scope.tablePanel.currRoom].id;
			ApiRequest.get(reqUrl, false)
			.success(function(data, state) {
				$scope.tablePanel.tablesList = data;
				console.log($scope.tablePanel.roomsList);
			});
		},
		table: {
			activeBg: '#123213',
			unactiveBg: '#228228',
			setBg: function(status) {
				if(status == 0) {
					return this.activeBg;
				} else {
					return this.unactiveBg;
				}
			},
			reserve: function(table) {
				if(confirm('Вы действительно хотите заказать этот столик?')) {
					console.log(table);
					if(table.status == 0) {
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
	}
	$scope.tablePanel.getRoomsList();
}]);
