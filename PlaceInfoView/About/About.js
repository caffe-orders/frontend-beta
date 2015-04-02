angular.module('app.PlaceAboutView', [
  'ngRoute',
  'ui.bootstrap',
  'ngSanitize'
])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.
    when('/place/:placeId/about/', {
      templateUrl: 'PlaceInfoView/About/About.html',
      controller: 'PlaceAboutCtrl'
    }).
    when('/place/:placeId/', {
      templateUrl: 'PlaceInfoView/About/About.html',
      controller: 'PlaceAboutCtrl'
    })
}])

.controller('PlaceAboutCtrl', ['$scope', '$routeParams', '$http', '$location', '$sce', '$rootScope',
  function($scope, $routeParams, $http, $location, $sce, $rootScope) {
    //init base data
    $scope.placeId = $routeParams.placeId;
    $scope.placeUrl = 'place/' + $routeParams.placeId + '/';
    
    //get all needed data about place (json)
    $http.get('http://api.caffe.ru/places/info?id=' + $scope.placeId).success(function(data) {
      $scope.data = data;
      $rootScope.title = 'О заведени | CaffeOrders';
    });
}]);