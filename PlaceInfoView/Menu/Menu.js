angular.module('app.PlaceMenuView', [
  'ngRoute',
  'ui.bootstrap'
])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.
    when('/place/:placeId/menu/', {
      templateUrl: 'PlaceInfoView/Menu/Menu.html',
      controller: 'PlaceMenuCtrl'
    })
}])

.controller('PlaceMenuCtrl', ['$scope', '$routeParams', '$http', '$rootScope',
  function($scope, $routeParams, $http, $rootScope) {
    //init base data
    $scope.placeId = $routeParams.placeId;
    $scope.placeUrl = 'place/' + $routeParams.placeId + '/';
    
    //get all needed data about place (json)
    var req = {
        method: 'GET',
        url: '//api.caffe.ru/menu/list?placeId=' + $scope.placeId,
        withCredentials: true,
        data: {
        }
      };
    $http(req).success(function(data, state) {
      $scope.data = data;
      console.log(data);  
      $rootScope.title = 'Меню | CaffeOrders';
      $scope.menuPanel.currCat = $scope.menuPanel.getCatById(0);
    
      console.log($scope.menuPanel.currCat.dishList);
    });
      
    $scope.menuPanel = {
      'currCat': null,
      'changeCat': function(catId) {
        $scope.menuPanel.currCat = $scope.menuPanel.getCatById(catId);
      },
      'getCatById': function(id) {
        var hid = -1;
        for(var catKey in $scope.data) {
          hid++;
          if(hid == id) return $scope.data[catKey];
        }
      }
    };
    
}]);