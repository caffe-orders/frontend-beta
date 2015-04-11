angular.module('app.BadBrowserView', [
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
    $rootScope.title = 'Браузер не поддерживается | CaffeOrders';
    
    
}]);