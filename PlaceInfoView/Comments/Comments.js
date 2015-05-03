angular.module('app.PlaceCommentsView', [
  'ngCookies',
  'ngRoute',
  'ui.bootstrap'
])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.
    when('/place/:placeId/comments/', {
      templateUrl: 'PlaceInfoView/Comments/Comments.html',
      controller: 'PlaceCommentsCtrl'
    })
}])

.controller('PlaceCommentsCtrl', ['$scope', '$routeParams', '$http', '$rootScope', '$cookies',
  function($scope, $routeParams, $http, $rootScope, $cookies) {
    //init base data
    $scope.placeId = $routeParams.placeId;
    $scope.placeUrl = 'place/' + $scope.placeId + '/';
    
    //get all needed data about place (json)
    $rootScope.title = 'Отзывы | CaffeOrders';
    
    $scope.commentsPanel = {
      'state': {
        'noComments': false
      },
      'placeId': null,
      'commentsList': {},
      'getCommentsList': function() {
        var req = {
          method: 'GET',
          url: '//api.caffe.ru/comments/list?id=' + this.placeId,
          crossDomain: true,
          withCredentials: true,
          data: { }
        };
        $http(req).success(function(data, state) {
          $scope.commentsPanel.commentsList = data;
          if(state == 204) $scope.commentsPanel.state.noComments = true;
          console.log($scope.commentsPanel.state.noComments);
        });
      },
      'send': function(comment) {
        var commentData = comment;
        var currDate = new Date();
        commentData.pubDate = currDate.getDate + '.' + currDate.getMonth + '.' + currDate.getFullYear;
        var req = {
          method: 'POST',
          url: '//api.caffe.ru/comments/new',
          crossDomain: true,
          withCredentials: true,
          data: { 
            'placeId': $scope.placeId,
            'state': ((commentData.state) ? 'true' : 'false'),
            'text': commentData.text
          },
          headers: { 'Content-Type': 'application/x-www-form-urlencoded'}
        };
        $http(req).success(function(data) {
          $scope.commentsPanel.getCommentsList(this.placeId);
          $scope.commentsPanel.clear();
        });
      },
      'clear': function() {
        $scope.comment.text = '';
        $scope.comment.state = true;
      }
    };
    
    $scope.commentsPanel.placeId = $scope.placeId;
    setInterval($scope.commentsPanel.getCommentsList(), 60000);
}]);