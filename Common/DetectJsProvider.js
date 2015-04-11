angular.module('app.BrowserDataProvider', []).factory('BrowserData', [function() {
  var browserData = detect.parse(navigator.userAgent);

  return browserData;
}]);