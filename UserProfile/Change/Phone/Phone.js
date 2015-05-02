angular.module('app.UserProfileChangePhoneView', [
  'ngRoute',
  'ui.bootstrap',
  'ngSanitize'
])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.
    when('/user/:userId/change/phone/', {
      templateUrl: 'UserProfile/Change/Phone/Phone.html',
      controller: 'UserProfileChangePhoneCtrl'
    })
}])

.controller('UserProfileChangePhoneCtrl', ['$scope', '$routeParams', '$http', '$location', '$sce', '$rootScope',
  function($scope, $routeParams, $http, $location, $sce, $rootScope) {
    //init base data
    $scope.userId = $routeParams.userId;
    $scope.userUrl = 'user/' + $routeParams.userId + '/';
    
    //get all needed data about place (json)
    $http.get('tmp/user.json').success(function(data) {
      $scope.userData = data;
      $rootScope.title = 'Сменить телефон | CaffeOrders';
    });
    
    $scope.phoneChangeForm = {
      oldPhone: null,
      newPhone: null,
      change: function() {
        if((/^\d{12}$/).test($scope.phoneChangeForm.oldPhone) && (/^\d{12}$/).test($scope.phoneChangeForm.newPhone)) {
          var req = {
            method: 'POST',
            url: '//api.caffe.ru/users/changephone',
            crossDomain: true,
            withCredentials: true,
            data: { 
              'oldphone': $scope.phoneChangeForm.oldPhone,
              'newphone': $scope.phoneChangeForm.newPhone,
            },
            headers: { 'Content-Type': 'application/x-www-form-urlencoded'}
          };
          $http(req).success(function(data, state) {
            if(state == 200) {
                var user = angular.fromJson(localStorage.getItem('user'));
                user.phone = $scope.phoneChangeForm.newPhone;
                localStorage.setItem('user', angular.toJson(user));
            }
            else console.log('magic was happend');
          });
        }
        else console.log('wrong phone format');
      }
    };
}]);