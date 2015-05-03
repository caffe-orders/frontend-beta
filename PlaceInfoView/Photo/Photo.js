angular.module('app.PlacePhotoView', [
  'ngRoute',
  'ui.bootstrap'
])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.
    when('/place/:placeId/photo/', {
      templateUrl: 'PlaceInfoView/Photo/Photo.html',
      controller: 'PlacePhotoCtrl'
    })
}])

.controller('PlacePhotoCtrl', ['$scope', '$routeParams', '$http', '$rootScope',
  function($scope, $routeParams, $http, $rootScope) {
    //init base data
    $scope.placeId = $routeParams.placeId;
    $scope.placeUrl = 'place/' + $routeParams.placeId + '/';
    
    //get all needed data about place (json)
    $http.get('tmp/photo.json').success(function(data) {
      $scope.galleryData = data.imgList;
      $rootScope.title = 'Фото | CaffeOrders';
    });
    
    $http.get('//api.caffe.ru/albums/list?placeId=' + $scope.placeId).success(function(data, state) {
      $scope.galleryData = data;
      $rootScope.title = 'Фото | CaffeOrders';
      if(state == 204) $scope.album.state.noData = true;
    });
    
    $scope.showFullImg = function(imgId) {  
      $scope.fullImgUrl = $scope.galleryData[imgId];
    }
    
    $scope.album = {
      'state': {
        'noData': false
      }
    }
}]);