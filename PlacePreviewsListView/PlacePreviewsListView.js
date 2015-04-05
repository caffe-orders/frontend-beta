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
          $scope.PlacePreviewsList = data;
          $location.path('list/' + $scope.pagination.currentPage + '/');
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
}]);