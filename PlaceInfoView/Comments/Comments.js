angular.module('app.PlaceCommentsView', [
  'ngRoute',
  'ui.bootstrap',
  'ngSanitize'
])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.
    when('/place/:placeId/comments/', {
      templateUrl: 'PlaceInfoView/Comments/Comments.html',
      controller: 'PlaceCommentsCtrl'
    })
}])

.controller('PlaceCommentsCtrl', ['$scope', '$routeParams', '$http', '$location', '$sce', '$rootScope',
  function($scope, $routeParams, $http, $location, $sce, $rootScope) {
    //init base data
    $scope.placeId = $routeParams.placeId;
    $scope.placeUrl = 'place/' + $routeParams.placeId + '/';
    
    //get all needed data about place (json)
    $http.get('tmp/comments.json').success(function(data) {
      $scope.commentsList = data;
      $rootScope.title = 'Отзывы | CaffeOrders';
    });
}]);