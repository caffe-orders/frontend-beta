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
  'app.PlacePhotoView',
  'app.PlaceSearchView',
  'app.TableReserveView',
  'app.OwnerPanelIndexView',
  'app.OwnerPanelPlaceView',
  'app.OwnerPanelCommentsView',
  'app.OwnerPanelStatView'
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
run(function($rootScope, $http) {
  $rootScope.title = 'Caffe-Orders | Fast & Beautiful table reservation service';
});