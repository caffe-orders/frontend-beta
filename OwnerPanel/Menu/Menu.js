angular.module('App.OwnerPanelMenu', [
  'ngRoute',
  'ui.bootstrap'
])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.
	when('/owner/:placeId/menu/', {
	  templateUrl: 'OwnerPanel/Menu/Menu.html',
	  controller: 'OwnerPanelMenuCtrl'
	})
}])

.controller('OwnerPanelMenuCtrl', ['$scope', '$routeParams', 'ApiRequest', 'md5', 'SendFile',
  function($scope, $routeParams, ApiRequest, md5, SendFile) {
	$scope.ownerUrl = 'owner/' +  $routeParams.placeId + '/';

	$scope.dish = {
		add: function(dish) {
			ApiRequest.post('/dish/new', {
				name: dish.name,
				description: dish.description,
				cost: dish.cost,
				dishCategoryId: $scope.menuPanel.currCat.id
			}, false)
			.success(function(data, state) {
				SendFile({
					file: dish.file,
					path: 'dishs',
					type: dishPreview,
					name: data.id + '.jpg'
				});
				console.log('dish has been added');
				alert('Блюдо добавлено');
			})
			.error(function(data, state) {
				alert('Возникла ошибка при добавлении блюда');
				console.log('api return arro while trying to add new dish');
			});
		}
	}

	$scope.menuPanel = {
		data: {},
		state: {
			noData: false
		},
		currCat: null,
		changeCat: function(catId) {
			$scope.menuPanel.currCat = $scope.menuPanel.getCatById(catId);
		},
		getCatById: function(id) {
			var hid = -1;
			for(var catKey in $scope.menuPanel.data) {
				hid++;
				if(hid == id) return $scope.menuPanel.data[catKey];
			}
		},
		getData: function(placeId) {
			var reqUrl = 'menu/list?placeId=' + placeId;
			console.log('try to load menu data');
			ApiRequest.get(reqUrl, true)
			.success(function(data, state) {
				console.log('menu data loaded');
				$scope.menuPanel.data = data;
				$scope.menuPanel.currCat = $scope.menuPanel.getCatById(0);
			})
			.error(function(data, state) {
				console.log('api return error while loaded menu data');
				$scope.menuPanel.state.noData = true;
			});
		}
	}
	$scope.menuPanel.getData($routeParams.placeId);

	var getCatList = function() {

	}
	getCatList();
}]);
