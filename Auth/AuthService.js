angular.module('app.AuthService', []).factory('AuthService', ['$http', '$location', function($http, $location) {
  var auth = {
    'user': {
      'uid': null,
      'sessionHash': null
    },
    'logIn': function(email, password) {
      var req = {
        method: 'POST',
        url: '//api.caffe.ru/auth/login',
        withCredentials: true,
        data: {
          'email': email,
          'password': password
        },
        headers: { 'Content-Type': 'application/x-www-form-urlencoded'}
      };
      $http(req).success(function(data, state) {
        console.log(state);
        $location.path('/list/1');
      });
    },
    'logOut': function() {
      
    }
  };

  return auth;
}]);