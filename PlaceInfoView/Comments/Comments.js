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
    $scope.placeUrl = 'place/' + $scope.placeId + '/';
    
    //get all needed data about place (json)
    $http.get('//api.caffe.ru/comments/list?id=' + $scope.placeId).success(function(data) {
      $scope.commentsList = data;
      $rootScope.title = 'Отзывы | CaffeOrders';
    });
    
    $scope.send = function(comment) {
      var commentData = comment;
      var queryString = 'http://api.caffe.ru/comments/new?' +
        'placeId=' + $scope.placeId + 
        '&state=' + ((commentData.state == true) ? true : false) + 
        '&text=' + commentData.text;
      alert(queryString);
      $http.get(queryString).success(function(data) {
        
      });
    }
}]);