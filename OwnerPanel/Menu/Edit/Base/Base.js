angular.module('app.OwnerPanelMenuBaseEditView', [
  'ngRoute',
  'ui.bootstrap'
])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.
    when('/owner/:placeId/menu/edit', {
      templateUrl: 'OwnerPanel/Menu/Edit/Base/Base.html',
      controller: 'OwnerPanelMenuBaseEditCtrl'
    })
}])

.controller('OwnerPanelMenuBaseEditCtrl', ['$scope', '$routeParams', '$rootScope', '$http',
  function($scope, $routeParams, $rootScope, $http) {
    //init base data
    var placeId = $routeParams.placeId;
    $scope.ownerUrl = 'owner/' +  $routeParams.placeId + '/';
    $rootScope.title = 'Панель владельца | CaffeOrders';
    
    $scope.placeId = $routeParams.placeId;
    
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
    }).error(function(){
      $scope.menuPanel.state.noData = true;
    });
      
    $scope.menuPanel = {
      'state': {
        'noData': false
      },
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