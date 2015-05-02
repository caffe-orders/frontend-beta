angular.module('app.UserProfileChangeUnameView', [
  'ngRoute',
  'ui.bootstrap',
  'ngSanitize'
])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.
    when('/user/:userId/change/uname/', {
      templateUrl: 'UserProfile/Change/Uname/Uname.html',
      controller: 'UserProfileChangeUnameCtrl'
    })
}])

.controller('UserProfileChangeUnameCtrl', ['$scope', '$routeParams', '$http', '$location', '$sce', '$rootScope',
  function($scope, $routeParams, $http, $location, $sce, $rootScope) {
    //init base data
    $scope.userId = $routeParams.userId;
    $scope.userUrl = 'user/' + $routeParams.userId + '/';
    
    //get all needed data about place (json)
    $http.get('tmp/user.json').success(function(data) {
      $scope.userData = data;
      $rootScope.title = 'Сменить телефон | CaffeOrders';
    });
    
    $scope.unameChangeForm = {
      firstName: null,
      lastName: null,
      change: function() {
        if(true) {
          var req = {
            method: 'POST',
            url: '//api.caffe.ru/users/changeuname',
            crossDomain: true,
            withCredentials: true,
            data: { 
              'firstname': $scope.unameChangeForm.firstName,
              'lastname': $scope.unameChangeForm.lastName
            },
            headers: { 'Content-Type': 'application/x-www-form-urlencoded'}
          };
          $http(req).success(function(data, state) {
            if(state == 200) {
              var user = angular.fromJson(localStorage.getItem('user'));
              user.firstName = $scope.unameChangeForm.firstName;
              user.lastName = $scope.unameChangeForm.lastName; 
              localStorage.setItem('user', angular.toJson(user));
            }
          });
        }
        else console.log('wrong name format');
      }
    };
}]);