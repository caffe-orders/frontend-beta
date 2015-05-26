angular.module('App.OwnerPanelMenu', [
  'ngRoute',
  'ui.bootstrap',
  'App.FileModel'
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

  $scope.category = {
   dishCategoryId: 0
  }
  var getCatList = function() {
  ApiRequest.get('dishcategory/list', true)
  .success(function(data, state) {
    $scope.catsList = data;
  });
  }
  getCatList();

  $scope.dinnersPanel = {
  currCat: 0,
  changeCat: function(catId) {
    $scope.dinnersPanel.currCat = catId;
    $scope.category.dishCategoryId = $scope.dinnersPanel.currCat;
    console.log('curr catId = ' + $scope.category.dishCategoryId);
    console.log($scope.dinnersPanel.dinnersList[0]);

  },
  state: {
    noData: false
  },
  dinnersList: {},
  getDinnersList: function(placeId) {
    console.log('placeId = ' + placeId);
    var reqUrl = 'menu/dishlist?placeId=' + placeId;
    console.log('try to get comples dinners list');
    ApiRequest.get(reqUrl, true)
    .success(function(data, state) {
    console.log('dinners list downloaded');
    $scope.dinnersPanel.dinnersList = data;
    if(state == 204) {
      console.log('no data in dinners list');
      $scope.dinnersPanel.state.noData = true;
    }
    else {
      $scope.dinnersPanel.state.noData = false;
    }
    })
    .error(function(data, state) {
    console.log('an error occured while loading dinner list');
    });
  },
  addDinner: function(dish) {
    ApiRequest.post('dish/new', {
    name: dish.name,
    description: dish.description,
    cost: dish.cost,
    dishCategoryId: dish.cat
    }, false)
    .success(function(data, state) {
    SendFile({
      file: dish.file,
      path: 'dishs',
      type: 'dish',
      name: data.id + '.jpg'
    });
    $scope.searchPanel.add(data.id);
    console.log('dish has been added');
    alert('Блюдо добавлено');
    })
    .error(function(data, state) {
    alert('Возникла ошибка при добавлении блюда');
    console.log('api return error while trying to add new dish');
    });
  },
  deleteDinner: function(id) {
    if(confirm('Вы действительно хотите удалить это блюдо?')) {
    ApiRequest.post('dish/delete', {
      id: id
    }, false)
    .success(function(data, state) {
      console.log('dinner deleted');
      $scope.dinnersPanel.getDinnersList($routeParams.placeId);
    })
    .error(function(data, state) {
      console.log('complex dinner deleting error');
      alert('Возникла ошибка при удалении блюда');
    });
    }
  },
  editDinner: function(dinner){
    ApiRequest.post('dish/update', {
    id: dinner.id,
    placeId: $routeParams.placeId,
    name: dinner.name,
    description: dinner.description,
    cost: dinner.cost,
    dishCategoryId: dinner.dishCategoryId
    }, false)
    .success(function(data, state) {
    console.log('dinner edited');
    if(dinner.preview != undefined && dinner.preview != null) {
      var fileData = {
      file: dinner.preview,
      path: 'dishs',
      type: 'dish',
      name: dinner.id + '.jpg'
      }
      SendFile(fileData)
      .success(function() {
      $scope.dinnersPanel.getDinnersList($routeParams.placeId);
      });
    }
    alert('Блюдо успешно изменено, изменение превью блюда происходит в фоновом режиме, не рекомндуется перезагружать страницу браузера сразу же после измения данных блюда');
    })
    .error(function(data, state) {
    console.log('complex dinner editing error');
    alert('Возникла ошибка при изменении данных блюда');
    });
  },
  }
  $scope.dinnersPanel.getDinnersList($routeParams.placeId);

  $scope.searchPanel = {
  dinnersList: {},
  search: function() {
    ApiRequest.get('dish/search?name=' + $scope.search.query, false)
    .success(function(data, state) {
    $scope.searchPanel.dinnersList = data;
    });
  },
  add: function(id) {
    ApiRequest.post('menu/add', {
    'placeId': $routeParams.placeId,
    'dishId': id
    }, false)
    .success(function(data, state) {
    alert('Блюдо добавлено в текущую категорию');
    $scope.dinnersPanel.getDinnersList($routeParams.placeId);
    })
    .error(function(data, state) {
    alert('Возникла ошибка при добавлении блюда в текущую катоегорию, попробуйте позже');
    });
  }
  }
}]);
