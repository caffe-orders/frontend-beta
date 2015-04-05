angular.module('app.OwnerPanelCommentsView', [
  'ngRoute',
  'ui.bootstrap',
  'ngSanitize'
])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.
    when('/owner/:placeId/comments/', {
      templateUrl: 'OwnerPanel/Comments/Comments.html',
      controller: 'OwnerPanelCommentsCtrl'
    })
}])

.controller('OwnerPanelCommentsCtrl', ['$scope', '$routeParams', '$http', '$location', '$sce', '$rootScope',
  function($scope, $routeParams, $http, $location, $sce, $rootScope) {
    //init base data
    var placeId = $routeParams.placeId;
    $scope.ownerUrl = 'owner/' + placeId + '/';
    $rootScope.title = 'Панель владельца | CaffeOrders';
    
    $scope.commentsPanel = {
      'placeId': null,
      'commentsList': {},
      'getCommentsList': function() {
        var queryString = '//api.caffe.ru/comments/list?id=' + this.placeId;
        var req = {
          method: 'GET',
          url: queryString,
          crossDomain: true,
          withCredentials: true,
          data: { }
        }
        $http(req).success(function(data) {
          $scope.commentsPanel.commentsList = data;
        });
      },
      'deleteComment': function(senderId) {
        var message = 'Действительно ли вы хотите удалить комментарий?';
        if(confirm(message))
        {
          var queryString = '//api.caffe.ru/comments/delete?senderId=' + senderId;
          var req = {
            method: 'GET',
            url: queryString,
            crossDomain: true,
            withCredentials: true,
            data: { }
          };
          $http(req).success(function(data) {
            $scope.commentsPanel.getCommentsList(this.placeId);
          });
        };
      }
    };
    $scope.commentsPanel.placeId = placeId;
    setInterval($scope.commentsPanel.getCommentsList(), 60000);
    
}]);