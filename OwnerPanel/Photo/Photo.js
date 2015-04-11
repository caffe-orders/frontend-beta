angular.module('app.OwnerPanelPhotoView', [
  'ngRoute',
  'ui.bootstrap'
])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.
    when('/owner/:placeId/photo/', {
      templateUrl: 'OwnerPanel/Photo/Photo.html',
      controller: 'OwnerPanelPhotoCtrl'
    })
}])

.controller('OwnerPanelPhotoCtrl', ['$scope', '$routeParams', '$http', '$rootScope',
  function($scope, $routeParams, $http, $rootScope) {
    //init base data
    $scope.placeId = $routeParams.placeId;
    $scope.ownerUrl = 'owner/' + $routeParams.placeId + '/';
    
    //get all needed data about place (json)
    $http.get('tmp/photo.json').success(function(data) {
      $scope.galleryData = data.imgList;
      $rootScope.title = 'Панель владельца | CaffeOrders';
    });
    
    $scope.showFullImg = function(imgId) {
      for(var i=0; i<$scope.galleryData.length; i++) {
        var img = $scope.galleryData[i];
        if(img.id == imgId)
        {
          $scope.fullImgUrl = img.full;
        }
      }
    }
}]);