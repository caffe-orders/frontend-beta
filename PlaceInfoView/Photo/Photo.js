angular.module('app.PlacePhotoView', [
  'ngRoute',
  'ui.bootstrap',
  'ngSanitize'
])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.
    when('/place/:placeId/photo/', {
      templateUrl: 'PlaceInfoView/Photo/Photo.html',
      controller: 'PlacePhotoCtrl'
    })
}])

.controller('PlacePhotoCtrl', ['$scope', '$routeParams', '$http', '$location', '$sce', '$rootScope',
  function($scope, $routeParams, $http, $location, $sce, $rootScope) {
    //init base data
    $scope.placeId = $routeParams.placeId;
    $scope.placeUrl = 'place/' + $routeParams.placeId + '/';
    
    //get all needed data about place (json)
    $http.get('tmp/photo.json').success(function(data) {
      $scope.galleryData = data.imgList;
      $rootScope.title = 'Фото | CaffeOrders';
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