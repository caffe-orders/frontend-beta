'use strict';

window.scroll(0,1);

// Declare app level module which depends on views, and components
angular.module('App', [
	'ngRoute',
	'App.ApiRequestProvider',
	'App.AuthProvider',
	'App.DetectJsProvider',
	'App.UserDataProvider',
	'App.SendFileProvider',
	'App.MD5Provider',
	'App.FileModel',
	'App.PlaceAbout',
	'App.PlaceComment',
	'App.PlaceComplexDinner',
	'App.PlaceMenu',
	'App.PlaceOrderCorporate',
	'App.PlaceOrderTable',
	'App.PlacePhoto',
	'App.PlacesListIndex',
	'App.PlacesListSearch',
	'App.OwnerPanelComment',
	'App.OwnerPanelComplexDinner',
	'App.OwnerPanelOrderCheck',
	'App.OwnerPanelPhoto',
	'App.OwnerPanelPlaceAbout',
	'App.OwnerPanelPlaceRoomCreate',
	'App.OwnerPanelStatistic',
	'App.OwnerPanelMenu',
	'App.BadBrowser',
	'App.UserProfileAbout',
	'App.UserProfileStat',
	'App.UserProfileChangePass',
	'App.UserProfileChangePhone',
	'App.UserProfileChangeUname',
	'App.UserProfileSettings'
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
run(function($location, BrowserData, AuthProvider) {
	AuthProvider.logIn('clain@sample.com', '199626');

	if(BrowserData.browser.family == 'IE' || BrowserData.browser.family == 'Opera Mini') {
		$location.path('/badbrowser/');
	}
});
