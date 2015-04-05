angular.module('app.OwnerPanelStatView', [
  'ngRoute',
  'ui.bootstrap',
  'googlechart',
  'ngSanitize'
])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.
    when('/owner/:placeId/stat/', {
      templateUrl: 'OwnerPanel/Stat/Stat.html',
      controller: 'OwnerPanelStatCtrl'
    })
}])

.controller('OwnerPanelStatCtrl', ['$scope', '$routeParams', '$http', '$location', '$sce', '$rootScope',
  function($scope, $routeParams, $http, $location, $sce, $rootScope, googleChartApiPromise) {
    //init base data
    var placeId = $routeParams.placeId;
    $scope.ownerUrl = 'owner/' + placeId + '/';
    $rootScope.title = 'Панель владельца | CaffeOrders';
    
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