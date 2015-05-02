angular.module('app.UserProfileChangePassView', [
  'ngRoute',
  'ui.bootstrap',
  'ngSanitize'
])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.
    when('/user/:userId/change/pass/', {
      templateUrl: 'UserProfile/Change/Pass/Pass.html',
      controller: 'UserProfileChangePassCtrl'
    })
}])

.controller('UserProfileChangePassCtrl', ['$scope', '$routeParams', '$http', '$location', '$sce', '$rootScope',
  function($scope, $routeParams, $http, $location, $sce, $rootScope) {
    //init base data
    $scope.userId = $routeParams.userId;
    $scope.userUrl = 'user/' + $routeParams.userId + '/';
    
    //get all needed data about place (json)
    $http.get('tmp/user.json').success(function(data) {
      $scope.userData = data;
      $rootScope.title = 'Сменить пароль | CaffeOrders';
    });
    
    $scope.passChangeForm = {
      oldPass: null,
      newPass: null,
      repeatedPass: null,
      change: function() {
        if((/^((\d)|(\w)){5,18}$/).test($scope.passChangeForm.oldPass) && (/^((\d)|(\w)){5,18}$/).test($scope.passChangeForm.newPass)) {
          if($scope.passChangeForm.newPass === $scope.passChangeForm.repeatedPass) {
            var req = {
              method: 'POST',
              url: '//api.caffe.ru/users/changepass',
              crossDomain: true,
              withCredentials: true,
              data: { 
                'oldpass': $scope.passChangeForm.oldPass,
                'newpass': $scope.passChangeForm.newPass,
              },
              headers: { 'Content-Type': 'application/x-www-form-urlencoded'}
            };
            $http(req).success(function(data) {
              
            });
          }
          else console.log('passwords mest me similar' + $scope.passChangeForm.newPass + $scope.passChangeForm.repeatedPass);
        }
        else console.log('wrong pass format');
      }
    };
}]);