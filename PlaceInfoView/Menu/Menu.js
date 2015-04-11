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
    $http.get('tmp/comments.json').success(function(data) {
      $scope.commentsList = data;
      $rootScope.title = 'Меню | CaffeOrders';
    });
}]);