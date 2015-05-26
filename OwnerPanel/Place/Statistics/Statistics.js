angular.module('App.OwnerPanelStatistic', [
	'ngRoute',
	'googlechart',
	'ui.bootstrap'
])

.config(['$routeProvider', function($routeProvider) {
	$routeProvider.
		when('/owner/:placeId/stat/', {
			templateUrl: 'OwnerPanel/Place/Statistics/Statistics.html',
			controller: 'OwnerPanelStatisticCtrl'
		})
}])

.controller('OwnerPanelStatisticCtrl', ['$scope', '$routeParams',
	function($scope, $routeParams, googleChartApiPromise) {
		//init base data
		$scope.ownerUrl = 'owner/' + $routeParams.placeId + '/';

	 $scope.chartObject = {};

		$scope.chartObject.data = {"cols": [
				{id: "t", label: "Topping", type: "string"},
				{id: "s", label: "Просмотры", type: "number"}
		], "rows": [
				{c: [
						{v: "01.04.2015"},
						{v: 3},
				]},
				{c: [
						{v: "02.04.2015"},
						{v: 31}
				]},
				{c: [
						{v: "03.04.2015"},
						{v: 5},
				]},
				{c: [
						{v: "01.04.2015"},
						{v: 3},
				]},
				{c: [
						{v: "02.04.2015"},
						{v: 31}
				]},
				{c: [
						{v: "03.04.2015"},
						{v: 5},
				]},
				{c: [
						{v: "04.04.2015"},
						{v: 15},
				]}
		]};


		// $routeParams.chartType == BarChart or PieChart or ColumnChart...
		$scope.chartObject.type = 'LineChart';
		$scope.chartObject.options = {
				'title': 'Просмотры за последние 7 дней',
				'bar': {groupWidth: 20},
				'width': $scope.chartObject.data.length * 65
		};
		$scope.chartObject1 = {};

		$scope.chartObject1.data = {"cols": [
				{id: "t", label: "Topping", type: "string"},
				{id: "s", label: "Просмотры", type: "number"}
		], "rows": [
				{c: [
						{v: "01.04.2015"},
						{v: 2},
				]},
				{c: [
						{v: "02.04.2015"},
						{v: 8}
				]},
				{c: [
						{v: "03.04.2015"},
						{v: 5},
				]},
				{c: [
						{v: "01.04.2015"},
						{v: 3},
				]},
				{c: [
						{v: "02.04.2015"},
						{v: 4}
				]},
				{c: [
						{v: "03.04.2015"},
						{v: 5},
				]},
				{c: [
						{v: "04.04.2015"},
						{v: 11},
				]}
		]};


		// $routeParams.chartType == BarChart or PieChart or ColumnChart...
		$scope.chartObject1.type = 'LineChart';
		$scope.chartObject1.options = {
				'title': 'Заявок за последние 7 дней',
				'bar': {groupWidth: 20},
				'width': $scope.chartObject.data.length * 65
		};


}]);
