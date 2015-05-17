angular.module('app.OwnerPanelMenuCreateView', [
  'ngRoute',
  'ui.bootstrap'
])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.
    when('/owner/:placeId/menu/', {
      templateUrl: 'OwnerPanel/Menu/Create/Create.html',
      controller: 'OwnerPanelMenuCreateCtrl'
    })
}])

.controller('OwnerPanelMenuCreateCtrl', ['$scope', '$routeParams', '$rootScope', '$http',
  function($scope, $routeParams, $rootScope, $http) {
    //init base data
    var placeId = $routeParams.placeId;
    $scope.ownerUrl = 'owner/' +  $routeParams.placeId + '/';
    $rootScope.title = 'Панель владельца | CaffeOrders';
    $http.get('//api.caffe.ru/dishcategory/list').success(function(data) {
      $scope.catsList = data;
      console.log(data);
    });
    $scope.dish = {
      add: function(dish) {
        var req = {
          method: 'POST',
          url: '//api.caffe.ru/filestoken/add',
          crossDomain: true,
          withCredentials: true,
          data: {
            lifeTime: 50
          },
          headers: { 'Content-Type': 'application/x-www-form-urlencoded'}
        };
        $http(req).success(function(data) {
          var req = {
            method: 'POST',
            url: '//files.caffe.ru/download.php',
            crossDomain: true,
            withCredentials: true,
            data: {
              sessionHash: data.sessionHash,
              token: data.token,
              path: 'files/dishs/',
              fileName: 3,
              fileType: 'dish',
              file: $scope.dish.file
            },
              headers: { 'Content-Type': 'application/x-www-form-urlencoded'}
          };
          $http(req).success(function(data) {
            var req = {
            method: 'POST',
            url: '//api.caffe.ru/dish/new',
            crossDomain: true,
            withCredentials: true,
            data: {
              name: dish.name,
              description: dish.description,
              cost: dish.cost,
              imgSrc: dish.imgSrc,
              dishCategoryId: dish.catId
            },
              headers: { 'Content-Type': 'application/x-www-form-urlencoded'}
          };
          $http(req).success(function(data) {
            alert('Блюдо успешно добавлено');
          });
          });
        });
      }
    }
}]);