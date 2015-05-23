angular.module('App.DetectJsProvider', []).factory('BrowserData', [function() {
	var browserData = detect.parse(navigator.userAgent);
	return browserData;
}]);
