'use strict';

window.scroll(0,1);

// Declare app level module which depends on views, and components
angular.module('App', [
  'ngRoute',
  'App.ApiRequestProvider',
  'App.AuthProvider',
  'App.DetectJsProvider',
  'App.UserDataProvider',
  'App.SendFileProvider',
  'App.NotifyPanelProvider',
  'App.MD5Provider',
  'App.FileModel',
  'App.PlaceAbout',
  'App.PlaceComment',
  'App.PlaceComplexDinner',
  'App.PlaceMenu',
  'App.PlaceOrderCorporate',
  'App.PlaceOrderTable',
  'App.PlacePhoto',
  'App.PlacesListIndex',
  'App.OwnerPanelComment',
  'App.OwnerPanelComplexDinner',
  'App.OwnerPanelOrderCheck',
  'App.OwnerPanelPhoto',
  'App.OwnerPanelPlaceAbout',
  'App.OwnerPanelPlaceRoomCreate',
  'App.OwnerPanelStatistic',
  'App.OwnerPanelMenu',
  'App.BadBrowser',
  'App.UserProfileAbout',
  'App.UserProfileStat',
  'App.UserProfileChangePass',
  'App.UserProfileChangePhone',
  'App.UserProfileChangeUname',
  'App.UserProfileSettings'
]).
config(['$routeProvider', '$locationProvider', '$sceDelegateProvider',
  function($routeProvider, $locationProvider, $sceDelegateProvider) {
  $routeProvider.otherwise({redirectTo: '/list/1'});
  $locationProvider.html5Mode(true);
  $sceDelegateProvider.resourceUrlWhitelist([
	'self',
	'https://www.google.com/maps/**'
  ]);
}]).
run(function($location, BrowserData, AuthProvider, ApiRequest, $rootScope, UserData) {
  //AuthProvider.logIn('clain@sample.com', '199626');

  if(BrowserData.browser.family == 'IE' || BrowserData.browser.family == 'Opera Mini') {
  $location.path('/badbrowser/');
  }
  var checkUnconfirmedOrders = function() {
	ApiRequest.get('orders/notconfirmed', false)
	.success(function(data, state) {
	  if(data[0]) {
		console.log('user have unconfirmed orders');
		$rootScope.notifyBtnVisible = true;
	  } else {
		console.log('user doesnt have unconfirmed orders');
		$rootScope.notifyBtnVisible = false;
	  }
	});
  }
  checkUnconfirmedOrders();

  var checkUserLogged = function() {
	ApiRequest.get('users/current', false)
	.success(function(data, state) {
		console.log(data);
	  if(state != 204) {
		$rootScope.profileVisible = true;
		UserData.setData(data);
	  } else {
		$rootScope.profileVisible = false;
	  }
	});
  }
  checkUserLogged();

  $rootScope.confirmOrder = function(code) {
	ApiRequest.post('orders/confirm', {
	  'code': code
	}, false)
	.success(function(data, state) {
	  alert('Заказ подтвержден');
	  $rootScope.notifyPanelExpanded = false;
	  $rootScope.notifyBtnVisible = false;
	})
	.error(function(data, state) {
	  alert('Введен неверный код либо заказа нет!');
	});
  }

  $rootScope.loginForm = {
  'data': {
	'loginForm': {
	'email': null,
	'password': null
	},
	'registrationForm': {
	'email': null,
	'password': null,
	'phone': null
	},
	'forgotPasswordForm': {
	email: null,
	code: null,
	newPass: null
	}
  },
  'state': {
	'wrongLoginEmail': false,
	'wrongLoginPassword': false,
	'failedToLogin': false,
	'successLogin': false,
	'wrondRegister': false,
	'successRegister': false
  },
  'login': function() {
	if($rootScope.loginForm.checkLoginForm()) {
	console.log('try to log in on email: ' + this.data.loginForm.email + ' , password: ' + this.data.loginForm.password);
	AuthProvider.logIn($rootScope.loginForm.data.loginForm.email, $rootScope.loginForm.data.loginForm.password).success(function(data, state) {
	  checkUserLogged();
	  checkUnconfirmedOrders();
	  $rootScope.signInOutModalVisible = false;
	}).error(function(data, state) {
	  $rootScope.loginForm.state.failedToLogin = true;
	});
	} else {
	$rootScope.loginForm.state.wrongLogin = true;
	}
  },
  'register': function() {
	if($rootScope.loginForm.checkRegistrationForm()) {
	AuthProvider.register($rootScope.loginForm.data.registrationForm.phone, $rootScope.loginForm.data.registrationForm.email, $rootScope.loginForm.data.registrationForm.password).success(function() {
	  $rootScope.loginForm.state.successRegister = true;
	  $rootScope.loginForm.state.wrongRegister = false;
	  console.log('registration success');
	}).error(function(){
	  $rootScope.loginForm.state.wrongRegister = true;
	});
	} else {
	$rootScope.loginForm.state.wrongRegister = true;
	}
  },
  'resetPassword': function() {

  },
  'checkLoginForm': function() {
	if((/^((\d)|(\w)){5,18}$/).test($rootScope.loginForm.data.loginForm.password)) {
	if((/^(.)*@(.)*\.(.){2,}$/).test($rootScope.loginForm.data.loginForm.email)) {
	  return true;
	} else {
	  $rootScope.loginForm.state.wrongLoginEmail = true;
	  return false;
	}
	} else {
	$rootScope.loginForm.state.wrongLoginPassword = true;
	return false;
	}
  },
  'checkRegistrationForm': function() {
	if((/^((\d)|(\w)){5,18}$/).test($rootScope.loginForm.data.registrationForm.password) && (/^(.){1,}@(.){2,}\.(.){2,10}$/).test($rootScope.loginForm.data.registrationForm.email) && (/^(\d){12}$/).test($rootScope.loginForm.data.registrationForm.phone)) {
	return true;
	} else {
	return false;
	}
  },
	restorePassword: function(phone) {
	  ApiRequest.post('users/restore', {
		'phone': phone
	  }, false)
	  .success(function(data, state) {
		$rootScope.regLogModalTabSelected = 3;
	  })
	  .error(function(data, state) {
		alert('Возможно у вас есть неподтвержденный запрос на восстановление');
		$rootScope.regLogModalTabSelected = 3;
	  });
	},
	changePassword(code, password) {
	  ApiRequest.post('users/confirm', {
		code: code,
		newPass: password
	  }, false)
	  .success(function(data, state) {
		alert('Пароль изменен');
		$scope.wrongCode = false;
	  })
	  .error(function(data, state) {
		$rootScope.wrongCode = true;
	  });
	}
}

});
