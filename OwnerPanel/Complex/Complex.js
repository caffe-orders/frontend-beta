angular.module('app.OwnerPanelComplexView', [
  'ngRoute'
])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.
    when('/owner/:placeId/complex/', {
      templateUrl: 'OwnerPanel/Complex/Complex.html',
      controller: 'OwnerPanelComplexCtrl'
    })
}])

.controller('OwnerPanelComplexCtrl', ['$scope', '$routeParams', '$http', '$rootScope',
  function($scope, $routeParams, $http, $rootScope) {
    //init base data
    $scope.placeId = $routeParams.placeId;
    $scope.ownerUrl = 'owner/' + $routeParams.placeId + '/';
    $rootScope.title = 'Панель владельца | CaffeOrders';
    
    //get all needed data about place (json)
    $http.get('http://api.caffe.ru/complexdinner/list?placeId=' + $scope.placeId).success(function(data, state) {
      $scope.data = data;
      console.log(data);
      $rootScope.title = 'Комплексные обеды | CaffeOrders';
      if(state == 204) $scope.complexDinnerPanel.state.noData = true;
    });
    
    $scope.query = {
      day: new Date().getDay()
    }
    console.log($scope.query.day);
    $scope.complexDinnerPanel = {
      'state': {
        'noData': false
      },
      addDinner: function(dinner) {
        var req = {
          method: 'POST',
          url: '//api.caffe.ru/complexdinner/add',
          crossDomain: true,
          withCredentials: true,
          data: {
            placeId: $scope.placeId,
            name: dinner.name,
            description: dinner.description,
            cost: dinner.cost,
            day: $scope.query.day
          },
          headers: { 'Content-Type': 'application/x-www-form-urlencoded'}
        };
        $http(req).success(function(data) {
          console.log('data' + data);
          $scope.complexDinnerPanel.getData();
        });
      },
      deleteDinner: function(id) {
        var req = {
          method: 'POST',
          url: '//api.caffe.ru/complexdinner/delete',
          crossDomain: true,
          withCredentials: true,
          data: {
            placeId: $scope.placeId,
            id: id
          },
          headers: { 'Content-Type': 'application/x-www-form-urlencoded'}
        };
        $http(req).success(function(data) {
          $scope.complexDinnerPanel.getData();
        });
      },
      editDinner: function(dinner){
        var req = {
          method: 'POST',
          url: '//api.caffe.ru/complexdinner/edit',
          crossDomain: true,
          withCredentials: true,
          data: {
            id: dinner.id,
            placeId: $scope.placeId,
            name: dinner.name,
            description: dinner.description,
            cost: dinner.cost,
            day: $scope.query.day
          },
          headers: { 'Content-Type': 'application/x-www-form-urlencoded'}
        };
        $http(req).success(function(data) {
          $scope.complexDinnerPanel.getData();
        });
      },
      getData: function() {
        $http.get('http://api.caffe.ru/complexdinner/list?placeId=' + $scope.placeId).success(function(data, state) {
          $scope.data = data;
          if(state == 204) $scope.complexDinnerPanel.state.noData = true;
        });
      }
    }
}]);