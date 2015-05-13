angular.module('app.OwnerPanelPlaceView', [
  'ngRoute',
  'ui.bootstrap'
])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.
    when('/owner/:placeId/place/', {
      templateUrl: 'OwnerPanel/Place/Place.html',
      controller: 'OwnerPanelPlaceCtrl'
    })
}])

.controller('OwnerPanelPlaceCtrl', ['$http', '$scope', '$routeParams', '$rootScope',
  function($scope, $routeParams, $rootScope, $http) {
    //init base data
    var placeId = $routeParams.placeId;
    $scope.ownerUrl = 'owner/' +  $routeParams.placeId + '/';
    $rootScope.title = 'Панель владельца | CaffeOrders';
    $scope.place = {
      update: function(place) {
        console('edit start');
        var req = {
          method: 'POST',
          url: '//api.caffe.ru/places/edit',
          crossDomain: true,
          withCredentials: true,
          data: {
            placeId: $scope.placeId,
            name: place.name,
            gmap: place.gmap,
            address: place.address,
            phones: place.phones,
            workTime: place.workTime,
            descr: place.descr,
            type: place.type,
            outdoors: ((place.outdoors) ? 1 : 0),
            cuisine: place.cuisine,
            parking: ((place.parking) ? 1 : 0),
            smoking: ((place.smoking) ? 1 : 0),
            wifi: ((place.wifi) ? 1 : 0),
            avgBill: place.avgBill
          },
          headers: { 'Content-Type': 'application/x-www-form-urlencoded'}
        };
        $http(req).success(function(data) {
          console.log('edit success');
        }).error(function() {
          console.log('edit wrong');
        });
      }
    }
}]);