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
    
    var queryString = '//api.caffe.ru/comments/list?id=' + placeId;
      var req = {
        method: 'GET',
        url: queryString,
        crossDomain: true,
        withCredentials: true,
        data: { }
      }
      $http(req).success(function(data) {
        $scope.commentsList = data;
      });
    
    $scope.deleteComment = function(senderId) {
      var queryString = '//api.caffe.ru/comments/delete?senderId=' + senderId;
      var req = {
        method: 'GET',
        url: queryString,
        crossDomain: true,
        withCredentials: true,
        data: { }
      }
      $http(req).success(function(data) {
        alert(loool);
      });
    };
    
}]);