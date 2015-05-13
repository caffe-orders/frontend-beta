angular.module('app.PlaceComplexView', [
  'ngRoute'
])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.
    when('/place/:placeId/complex/', {
      templateUrl: 'PlaceInfoView/Complex/Complex.html',
      controller: 'PlaceComplexCtrl'
    })
}])

.controller('PlaceComplexCtrl', ['$scope', '$routeParams', '$http', '$rootScope',
  function($scope, $routeParams, $http, $rootScope) {
    //init base data
    $scope.placeId = $routeParams.placeId;
    $scope.placeUrl = 'place/' + $routeParams.placeId + '/';
    $scope.query = {
      day: new Date().getDay()
    }
    //get all needed data about place (json)
    $http.get('http://api.caffe.ru/complexdinner/list?placeId=' + $scope.placeId, { cache: true }).success(function(data, state) {
      $scope.data = data;
      console.log(data);
      $rootScope.title = 'Комплексные обеды | CaffeOrders';
      if(state == 204) $scope.complexDinnerPanel.state.noData = true;
    });
    
    $scope.complexDinnerPanel = {
      'state': {
        'noData': false
      }
    }
}]);