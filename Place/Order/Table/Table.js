angular.module('App.PlaceOrderTable', [
  'ngRoute',
  'ui.bootstrap'
])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/table/reserve/:placeId/', {
    templateUrl: 'Place/Order/Table/Table.html',
    controller: 'PlaceOrderTableCtrl'
  })
}])

.controller('TableReserveCtrl', ['$scope', '$routeParams', '$http', '$location', '$rootScope',
  function($scope, $routeParams, $http, $location, $rootScope) {
    //init base data
    $rootScope.title = 'Заказать столик';
    $scope.placeUrl = 'place/' + $routeParams.placeId + '/';
    $scope.reserveTablePanel = {
      state: {
        noData: false
      },
      rooms: {
        data: { },
        getRoomsList: function(placeId) {
          $http.get('tmp/tables.json')
            .success(function(data, state) {
              if(state == 200) {
                console.log(data);
                $scope.reserveTablePanel.rooms.data = data;
              } else {
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
          }
          else {
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
            var req = {
              method: 'GET',
              url: '//api.caffe.ru/comments/list?id=' + this.placeId,
              crossDomain: true,
              withCredentials: true,
              data: { }
            };
            $http(req).success(function(data, state) {

            });
          }
        }
      },
      reserveTable: function(table) {
        alert('lalka');
      }
    }
    $scope.reserveTablePanel.rooms.getRoomsList(5);
}]);