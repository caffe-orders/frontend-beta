angular.module('App.PlaceComment', [
  'ngCookies',
  'ngRoute',
  'ui.bootstrap'
])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.
    when('/place/:placeId/comments/', {
      templateUrl: 'Place/Comment/Comment.html',
      controller: 'PlaceCommentCtrl'
    })
}])

.controller('PlaceCommentCtrl', ['$scope', '$routeParams', 'ApiRequest',
  function($scope, $routeParams, ApiRequest) {
    //init base data
    $scope.placeUrl = 'place/' + $routeParams.placeId + '/';
    
    $scope.commentsPanel = {
      state: {
        'noComments': false
      },
      commentsList: {},
      getCommentsList: function() {
				console.log('try to get comments list');
				
				var reqUrl = 'comments/list?id=' + $routeParams.placeId;
				ApiRequest.get(reqUrl, false)
				.success(function(data, state) {
					console.log('comments list recieved')
					$scope.commentsPanel.commentsList = data;
					console.log('check comments list');
					if(state == 204) {
						console.log('there is no data in comments list');
						$scope.commentsPanel.state.noComments = true;
					} else {
						$scope.commentsPanel.state.noComments = false;
						console.log('comments list have comments');
					}
				})
				.error(function(data, state) {
					console.log('api return error while loading comments list');
				});
      },
      send: function(comment) {
				console.log('try to add comment');
				ApiRequest.post('comments/new', {
					'placeId': $routeParams.placeId,
					'state': ((comment.state) ? 'true' : 'false'),
					'text': comment.text
				}, false)
				.success(function(data, state) {
					console.log('comment added');
					$scope.commentsPanel.getCommentsList(this.placeId);
          $scope.commentsPanel.clear();
				})
				.error(function(data, state) {
					console.log('error while adding new comment');
				});
      },
      clear: function() {
        $scope.comment.text = '';
        $scope.comment.state = true;
      }
    };
    
    setInterval($scope.commentsPanel.getCommentsList(), 60000);
}]);