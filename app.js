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
    'email': null,
    'password': null,
    'send': function() {
      console.log('try to log in on email: ' + this.email + ' , password: ' + this.password);
      AuthService.logIn($rootScope.loginForm.email, $rootScope.loginForm.password);
    }
  }
  //AuthService.logIn('clain@sample.com', 199626);
  if(BrowserData.browser.family == 'IE' || BrowserData.browser.family == 'Opera Mini') {
    $location.path('/badbrowser/');
  }
});