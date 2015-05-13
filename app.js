'use strict';

window.scroll(0,1);

// Declare app level module which depends on views, and components
angular.module('app', [
  'ngRoute',
  'app.PlacePreviewsListView',
  'app.PlaceAboutView',
  'app.PlaceCommentsView',
  'app.PlaceMenuView',
  'app.PlaceComplexView',
  'app.UserProfileAboutView',
  'app.UserProfileSettingsView',
  'app.UserProfileStatView',
  'app.UserProfileChangePhoneView',
  'app.UserProfileChangePassView',
  'app.UserProfileChangeUnameView',
  'app.PlacePhotoView',
  'app.PlaceSearchView',
  'app.TableReserveView',
  'app.OwnerPanelIndexView',
  'app.OwnerPanelPlaceView',
  'app.OwnerPanelCommentsView',
  'app.OwnerPanelStatView',
  'app.AuthService',
  'app.BrowserDataProvider',
  'app.BadBrowserView',
  'app.OwnerPanelRoomCreateView',
  'app.OwnerPanelRoomEditView',
  'app.OwnerPanelRoomBaseEditView',
  'app.OwnerPanelPhotoView',
  'app.OwnerPanelMenuCreateView',
  'app.OwnerPanelMenuEditView',
  'app.OwnerPanelMenuBaseEditView',
  'app.OwnerPanelComplexView',
  'app.ActivationView',
]).
config(['$routeProvider', '$locationProvider', '$sceDelegateProvider', 
  function($routeProvider, $locationProvider, $sceDelegateProvider) {
    $routeProvider.otherwise({redirectTo: '/list/1'});
    $locationProvider.html5Mode(true);
    $sceDelegateProvider.resourceUrlWhitelist([
      'self',
      'https://www.google.com/maps/**'
    ]);
}]).
run(function($rootScope, $http, $location, AuthService, BrowserData) {
  $rootScope.title = 'Caffe-Orders | Fast & Beautiful table reservation service';
  $rootScope.loginForm = {
    'data': {
      'loginForm': {
        'email': null,
        'password': null
      },
      'registrationForm': {
        'email': null,
        'password': null,
        'phone': null
      },
      'forgotPasswordForm': {
        email: null,
        code: null,
        newPass: null
      }
    },
    'state': {
      'wrongLoginEmail': false,
      'wrongLoginPassword': false,
      'failedToLogin': false,
      'successLogin': false,
      'wrondRegister': false,
      'successRegister': false
    },
    'login': function() {
      if($rootScope.loginForm.checkLoginForm()) {
        console.log('try to log in on email: ' + this.data.loginForm.email + ' , password: ' + this.data.loginForm.password);
        AuthService.login($rootScope.loginForm.data.loginForm.email, $rootScope.loginForm.data.loginForm.password).success(function(data, state) {
          $rootScope.signInOutModalVisible = false;
        }).error(function(data, state) {
          $rootScope.loginForm.state.failedToLogin = true;
        });
      } else {
        $rootScope.loginForm.state.wrongLogin = true;
      }
    },
    'register': function() {
      if($rootScope.loginForm.checkRegistrationForm()) {
        AuthService.register($rootScope.loginForm.data.registrationForm.phone, $rootScope.loginForm.data.registrationForm.email, $rootScope.loginForm.data.registrationForm.password).success(function() {
          $rootScope.loginForm.state.successRegister = true;
          $rootScope.loginForm.state.wrongRegister = false;
          console.log('registration success');
        }).error(function(){
          $rootScope.loginForm.state.wrongRegister = true;
        });
      } else {
        $rootScope.loginForm.state.wrongRegister = true;
      }
    },
    'resetPassword': function() {

    },
    'checkLoginForm': function() {
      if((/^((\d)|(\w)){5,18}$/).test($rootScope.loginForm.data.loginForm.password)) {
        if((/^(.)*@(.)*\.(.){2,}$/).test($rootScope.loginForm.data.loginForm.email)) {
          return true;
        } else {
          $rootScope.loginForm.state.wrongLoginEmail = true;
          return false;
        }
      } else {
        $rootScope.loginForm.state.wrongLoginPassword = true;
        return false;
      }
    },
    'checkRegistrationForm': function() {
      if((/^((\d)|(\w)){5,18}$/).test($rootScope.loginForm.data.registrationForm.password) && (/^(.){1,}@(.){2,}\.(.){2,10}$/).test($rootScope.loginForm.data.registrationForm.email) && (/^(\d){12}$/).test($rootScope.loginForm.data.registrationForm.phone)) {
        return true;
      } else {
        return false;
      }
    }
  }
  //AuthService.logIn('clain@sample.com', 199626);
  if(BrowserData.browser.family == 'IE' || BrowserData.browser.family == 'Opera Mini') {
    $location.path('/badbrowser/');
  }
  setInterval($rootScope.loginForm.state.successRegister, 1000);
});