angular.module('App.OwnerPanelComplexDinner', [
	'ngRoute',
	'App.FileModel'
])

.config(['$routeProvider', function($routeProvider) {
	$routeProvider.
	when('/owner/:placeId/complex/', {
		templateUrl: 'OwnerPanel/ComplexDinner/ComplexDinner.html',
		controller: 'OwnerPanelComplexDinnerCtrl'
	})
}])

.controller('OwnerPanelComplexDinnerCtrl', ['$scope', '$routeParams', 'ApiRequest', 'SendFile', '$location',
function($scope, $routeParams, ApiRequest, SendFile) {
	//init base data
	$scope.ownerUrl = 'owner/' + $routeParams.placeId + '/';

	$scope.week = {
	  day: new Date().getDay()
	}

	$scope.complexDinnerPanel = {
		state: {
			noData: false
		},
		dinnersList: {},
		getComplexDinnersList: function(placeId) {
			console.log('placeId = ' + placeId);
			var reqUrl = 'complexdinner/list?placeId=' + placeId;
			console.log('try to get comples dinners list');
			ApiRequest.get(reqUrl, true)
			.success(function(data, state) {
				console.log('complex dinners list downloaded');
				$scope.complexDinnerPanel.dinnersList = data;
				if(state == 204) {
					console.log('no data in dinners list');
					$scope.complexDinnerPanel.state.noData = true;
				}
				else {
					$scope.complexDinnerPanel.state.noData = false;
				}
			})
			.error(function(data, state) {
				console.log('an error occured while loading dinner list');
			});
		},
		addDinner: function(dinner) {
			ApiRequest.post('complexdinner/add', {
				placeId: $routeParams.placeId,
				name: dinner.name,
				description: dinner.description,
				cost: dinner.cost,
				day: $scope.week.day
			}, false)
			.success(function(data, state) {
				console.log('complex dinner added');
				alert('Комплексный обед добавлен');
				$scope.complexDinnerPanel.getComplexDinnersList($routeParams.placeId);
				var fileData = {
					file: dinner.preview,
					path: 'complexDinner',
					type: 'previewComplexDinner',
					name: data[0] + '.jpg'
				}
				SendFile(fileData)
			})
			.error(function(data, state) {
				console.log('complex dinner adding error');
				alert('Произошла ошибка при добавлении комплексного обеда');
			});
		},
		deleteDinner: function(id) {
			if(confirm('Вы действительно хотите удалить этот обед?')) {
				ApiRequest.post('complexdinner/delete', {
					placeId: $routeParams.placeId,
					id: id
				}, false)
				.success(function(data, state) {
					console.log('dinner deleted');
					$scope.complexDinnerPanel.getComplexDinnersList($routeParams.placeId);
				})
				.error(function(data, state) {
					console.log('complex dinner deleting error');
					alert('Возникла ошибка при удалении столика');
				});
			}
		},
		editDinner: function(dinner){
			ApiRequest.post('complexdinner/edit', {
				id: dinner.id,
				placeId: $routeParams.placeId,
				name: dinner.name,
				description: dinner.description,
				cost: dinner.cost,
				day: $scope.week.day
			}, false)
			.success(function(data, state) {
				console.log('dinner edited');
				if(dinner.preview != undefined && dinner.preview != null) {
					var fileData = {
						file: dinner.preview,
						path: 'complexDinner',
						type: 'previewComplexDinner',
						name: dinner.id + '.jpg'
					}
					SendFile(fileData);
				}
				alert('Обед успешно изменен, изменение превью блюда происходит в фоновом режиме, не рекомндуется перезагружать страницу браузера сразу же после измения данных блюда');
			})
			.error(function(data, state) {
				console.log('complex dinner editing error');
				alert('Возникла ошибка при изменении данных блюда');
			});
		},
	}
	$scope.complexDinnerPanel.getComplexDinnersList($routeParams.placeId);
}]);
