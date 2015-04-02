angular.module('app.PlaceCommentsView', [
  'ngCookies',
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

.controller('PlaceCommentsCtrl', ['$scope', '$routeParams', '$http', '$location', '$sce', '$rootScope', '$cookies',
  function($scope, $routeParams, $http, $location, $sce, $rootScope, $cookies) {
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
      var currDate = new Date();
      commentData.pubDate = currDate.getDate + '.' + currDate.getMonth + '.' + currDate.getFullYear;
      var queryString = '//api.caffe.ru/comments/new?' +
        'placeId=' + $scope.placeId + 
        '&state=' + ((commentData.state) ? true : false) + 
        '&text=' + commentData.text;
      var req = {
        method: 'GET',
        url: queryString,
        crossDomain: true,
        withCredentials: true,
        data: { }
      }
      $http(req).success(function(data) {
        $scope.commentsList.push(commentData);
      });
    }
}]);