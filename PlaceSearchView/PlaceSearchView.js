angular.module('app.PlaceSearchView', [
  'ngRoute',
  'ui.bootstrap'
])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/search/:pageNo', {
    templateUrl: 'PlaceSearchView/PlaceSearchView.html',
    controller: 'PlaceSearchViewCtrl'
  }).
  otherwise({redirectTo: '/search/1'});;
}])

.controller('PlaceSearchViewCtrl', ['$scope', '$routeParams', '$http', '$location', '$rootScope',
  function($scope, $routeParams, $http, $location, $rootScope) {
    //init base data to previews list
    
    $scope.searchFormCollapsed = true;
    
    $http.get('http://api.caffe.ru/places/shortlist?limit=5&offset=0').success(function(data) {
      $scope.PlacePreviewsList = data;
      $scope.currentPage = $routeParams.pageNo;
      $rootScope.title = 'Поиск заведений | CaffeOrders';
    });
    //pagination config
    $scope.totalItems = 60;
    $scope.currentPage = 1;
    $scope.maxSize = 7;

    $scope.setPage = function (pageNo) {
      $scope.currentPage = pageNo;
    };

    $scope.onPageChanged = function() {
      $http.get('http://api.caffe.ru/places/shortlist?limit=5&offset=0').success(function(data) {
        $scope.PlacePreviewsList = data;
        $location.path('search/' + $scope.currentPage);
      });
    };

    $scope.maxSize = 7;
}]);