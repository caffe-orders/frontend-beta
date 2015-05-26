angular.module('App.OwnerPanelPlaceRoomCreate', [
	'ngRoute',
	'ui.bootstrap',
	'App.FileModel'
])

.config(['$routeProvider', function($routeProvider) {
	$routeProvider.
		when('/owner/:placeId/rooms/', {
			templateUrl: 'OwnerPanel/Place/Room/Room.html',
			controller: 'OwnerPanelPlaceRoomCreateCtrl'
		})
}])

.controller('OwnerPanelPlaceRoomCreateCtrl', ['$scope', '$routeParams', 'ApiRequest', 'SendFile', '$timeout',
function($scope, $routeParams, ApiRequest, SendFile, $timeout) {
	//init base data
	$scope.placeId = $routeParams.placeId;
	$scope.ownerUrl = 'owner/' + $routeParams.placeId + '/';

	$scope.roomsPanel = {
		currRoom: 1,
		tablesList: {},
		roomsList: {},
		prev: function() {
			if($scope.roomsPanel.currRoom > 0) {
				$scope.roomsPanel.currRoom--;
			} else {
				$scope.roomsPanel.currRoom = $scope.roomsPanel.roomsList.length - 1;
			}
			console.log($scope.roomsPanel.currRoom);
			$scope.roomsPanel.getTablesList();
		},
		next: function() {
			if($scope.roomsPanel.currRoom < ($scope.roomsPanel.roomsList.length - 1)) {
				$scope.roomsPanel.currRoom++;
			} else {
				$scope.roomsPanel.currRoom = 0;
			}
			$scope.roomsPanel.getTablesList();
			console.log($scope.roomsPanel.currRoom);
		},
		getRoomsList: function() {
			var reqUrl = 'rooms/list?placeId=' + $routeParams.placeId;
			ApiRequest.get(reqUrl, false)
			.success(function(data, state) {
				$scope.roomsPanel.roomsList = data;
				$scope.roomsPanel.getTablesList();
				console.log($scope.roomsPanel.roomsList);
			});
		},
		getTablesList: function() {
			var reqUrl = 'tables/list?placeId=' + $routeParams.placeId + '&roomId=' + $scope.roomsPanel.roomsList[$scope.roomsPanel.currRoom].id;
			ApiRequest.get(reqUrl, false)
			.success(function(data, state) {
				$scope.roomsPanel.tablesList = data;
				console.log($scope.roomsPanel.roomsList);
				$scope.roomsPanel.setTablesDraggable();
			});
		},
		addRoom: function(room) {
			console.log('try to add new room');
			ApiRequest.post('rooms/add', {
				placeId: $routeParams.placeId,
				capacity: room.capacity
			}, false)
			.success(function(data, state) {
				console.log('room has been added');
				alert('Комната добавлена, загрузка плана помещения происходит в фоновом режиме');
				SendFile({
					file: room.file,
					path: 'places/' + $routeParams.placeId + '/rooms/',
					type: 'roomScheme',
					name: 'scheme.jpg'
				});
			})
			.error(function(data, state) {
				console.log('an error occured while try to add new room');
				alert('Возникла ошибка при добавлении комнаты, попробуйте позже');
			});
		},
		delete: function() {
			if(confirm('Вы действительно хотите удалить эту комнату?')) {
				ApiRequest.post('rooms/delete', {
					roomId: $scope.roomsPanel.roomsList[$scope.roomsPanel.currRoom].id
				}, false)
				.success(function(data, state) {
					console.log('room has been deleted');
					alert('Комната удалена');
					$scope.roomsPanel.getRoomsList();
				})
				.error(function(data, state) {
					console.log('an error occured while try to delete room');
					alert('Возникла ошибка при удалении комнаты, попробуйте позже');
				});
			}
		},
		save: function() {

		},
		reestablish: function() {
			ApiRequest.post('rooms/reestablish', {
				'roomId': $scope.roomsPanel.roomsList[$scope.roomsPanel.currRoom].id
			}, false)
			.success(function(data, state) {
				console.log('room has been reestablished');
				alert('Комната восстановлена');
				$scope.roomsPanel.getRoomsList();
			})
			.error(function(data, state) {
				console.log('an error occured while try to reestablish room');
				alert('Возникла ошибка при восстановлении комнаты, попробуйте позже');
			});
		},
		addTable: function(roomNo, type) {
			ApiRequest.post('tables/add', {
				 'placeId': $routeParams.placeId,
				'roomId': $scope.roomsPanel.roomsList[roomNo].id,
				'type': type,
				'posX': 0,
				'posY': 0
			}, false)
			.success(function(data, state) {
				console.log('table added');
				$scope.roomsPanel.getTablesList();
				$scope.roomsPanel.setTablesDraggable();
			})
			.error(function(data, state) {
				console.log('an error occured while try to reestablish room');
				alert('Возникла ошибка при добавлении столика, попробуйте позже');
			});
		},
		setTablesDraggable: function() {
			$timeout(function() {
			$(".draggable").draggable({containment:'.b-room_scheme'});
			});
		}
	}
	$scope.roomsPanel.getRoomsList();




}]);
