angular.module('app.PlacePreviewsListView', [
  'ngRoute',
  'ui.bootstrap'
])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/list/:pageNo', {
    templateUrl: 'PlacePreviewsListView/PlacePreviewsListView.html',
    controller: 'PlacePreviewsListCtrl'
  });
}])

.controller('PlacePreviewsListCtrl', ['$scope', '$routeParams', '$http', '$location', '$rootScope',
  function($scope, $routeParams, $http, $location, $rootScope) {
    //init base data to previews list
    
    $scope.searchFormCollapsed = true;
    
    $http.get('tmp/previews' + $routeParams.pageNo + '.json').success(function(data) {
      $scope.PlacePreviewsList = data;
      $scope.currentPage = $routeParams.pageNo;
      $rootScope.title = 'Список заведений | CaffeOrders';
    });
    //pagination config
    $scope.totalItems = 60;
    $scope.currentPage = 1;
    $scope.maxSize = 7;

    $scope.setPage = function (pageNo) {
      $scope.currentPage = pageNo;
    };

    $scope.onPageChanged = function() {
      $http.get('tmp/previews' + $scope.currentPage + '.json').success(function(data) {
        $scope.PlacePreviewsList = data;
        $location.path('list/' + $scope.currentPage);
      });
    };

    $scope.maxSize = 7;
    
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