angular.module('app.PlacePreviewsListView', [
  'ngRoute',
  'ui.bootstrap'
])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/list/:pageNo/', {
    templateUrl: 'PlacePreviewsListView/PlacePreviewsListView.html',
    controller: 'PlacePreviewsListCtrl'
  });
}])

.controller('PlacePreviewsListCtrl', ['$scope', '$routeParams', '$http', '$location', '$rootScope',
  function($scope, $routeParams, $http, $location, $rootScope) {
   //init base data to previews list     
    $scope.pagination = {
      'totalItems': 999999,
      'currentPage': 1,
      'maxSize': 7,
      'onPageChanged': function() {
        $http.get('http://api.caffe.ru/places/list?limit=12&offset=' + ($scope.pagination.currentPage - 1) * 12).success(function(data) {
          if(!data) {
            alert('No data');
          }
          else {
            $scope.PlacePreviewsList = data;
            console.log(data);
            $location.path('list/' + $scope.pagination.currentPage + '/');
          }
        });
      }
    }
    $scope.setPage = function(pageNo) {
      $scope.pagination.currentPage = pageNo;
    };
    $scope.setPage($routeParams.pageNo);
    $scope.pagination.onPageChanged();
    
    //rating
    $scope.max = 5;
    $scope.isReadonly = true;

    $scope.hoveringOver = function(value) {
      $scope.overStar = value;
      $scope.percent = 100 * (value / $scope.max);
    };

    $scope.ratingStates = [
      {stateOn: 'b-rating_star', stateOff: 'b-rating_star__empty'}
    ];
    
    $scope.ratePlace = function(placeId, mark) {
      var req = {
          method: 'POST',
          url: '//api.caffe.ru/places/rate',
          withCredentials: true,
          data: { 
            'placeId': placeId,
            'mark': mark
          },
          headers: { 'Content-Type': 'application/x-www-form-urlencoded'}
        };
        $http(req).success(function(data) {
          console.log('set mark ' + mark + ' for place ' + placeId);
          $scope.pagination.onPageChanged();
        });
    };
}]);