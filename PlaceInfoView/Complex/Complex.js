angular.module('app.PlaceComplexView', [
  'ngRoute',
  'ui.bootstrap',
  'ngSanitize'
])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.
    when('/place/:placeId/complex/', {
      templateUrl: 'PlaceInfoView/Complex/Complex.html',
      controller: 'PlaceComplexCtrl'
    })
}])

.controller('PlaceComplexCtrl', ['$scope', '$routeParams', '$http', '$location', '$sce', '$rootScope',
  function($scope, $routeParams, $http, $location, $sce, $rootScope) {
    //init base data
    $scope.placeId = $routeParams.placeId;
    $scope.placeUrl = 'place/' + $routeParams.placeId + '/';
    
    //get all needed data about place (json)
    $http.get('tmp/comments.json').success(function(data) {
      $scope.commentsList = data;
      $rootScope.title = 'Комплексные обеды | CaffeOrders';
    });
}]);