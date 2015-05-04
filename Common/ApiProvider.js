angular.module('app.ApiProvider', ['app.ChacheProvider']).factory('apiProvider', ['$http', function($http, cacheProvider) {
  var apiProviderObject = {
    cacheProvider: cacheProvider,
    get: function(url, params) {
      
    },
    post: function(url, params) {
      
    }
  }
}]);