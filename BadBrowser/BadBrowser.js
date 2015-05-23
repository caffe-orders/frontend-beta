angular.module('App.BadBrowser', [
  'ngRoute'
])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.
	when('/badbrowser/', {
	  templateUrl: 'BadBrowser/BadBrowser.html',
	  controller: 'BadBrowserCtrl'
	})
}])

.controller('BadBrowserCtrl', ['$rootScope',
  function($rootScope) {
	//init base data


}]);
