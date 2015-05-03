angular.module('app.AuthService', []).factory('AuthService', ['$http', '$location', function($http, $location) {
  var auth = {
    'defaultRedirectPath': '/list/',
    'user': {
      'uid': null,
      'sessionHash': null,
      'firstName': null,
      'lastName': null,
      'address': null,
      'city': null,
      'phone': null,
      'email': null
    },
    'login': function(email, password) {
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
      var loginState = false;
      $http(req).success(function(data, state) {
        console.log('authorized with code: ' + state);
        
        auth.user.uid = data.id;
        auth.user.sessionHash = data.sessionHash;
        auth.user.firstName = data.firstName;
        auth.user.lastName = data.lastName;
        auth.user.address = 'not yet implemetned';
        auth.user.city = 'Могилев';
        auth.user.phone = data.phone;
        auth.user.email = data.email;
        localStorage.setItem('user', angular.toJson(auth.user));
        $location.path(this.defaultRedirectPath);
        console.log(state);
        if(state == 200) {
          loginState = true;
        }
      });
      return loginState;
    },
    'logOut': function() {
      
    },
    'register': function(phone, email, password) {
      var req = {
        method: 'POST',
        url: '//api.caffe.ru/users/new',
        withCredentials: true,
        data: {
          'email': email,
          'password': password,
          'phone': phone
        },
        headers: { 'Content-Type': 'application/x-www-form-urlencoded'}
      };
      var registerState = false;//bug here HEREHREHREHRHERHEHREHRHEHRHERHEHRHERHEHREHRHEHREH
      $http(req).success(function(data, state) {
        if(state == 200) {
          registerState = true;
        }
        $location.path(this.defaultRedirectPath);
      });
      console.log(registerState);
      return registerState;
    }
  };

  return auth;
}]);