angular.module('App.OwnerPanelComment', [
  'ngRoute',
  'ui.bootstrap',
])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.
	when('/owner/:placeId/comments/', {
	  templateUrl: 'OwnerPanel/Comment/Comment.html',
	  controller: 'OwnerPanelCommentCtrl'
	})
}])

.controller('OwnerPanelCommentCtrl', ['$scope', '$routeParams', 'ApiRequest',
function($scope, $routeParams, ApiRequest) {
	$scope.ownerUrl = 'owner/' + $routeParams.placeId + '/';

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
					console.log('comments list have comments');
					$scope.commentsPanel.state.noComments = false;
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
		},
		deleteComment: function(senderId) {
			var message = 'Действительно ли вы хотите удалить комментарий?';
			if(confirm(message))
			{
				console.log('try to delete comment with senderId = ' + senderId);
				ApiRequest.post('comments/delete', {
					senderId: senderId
				}, false)
				.success(function(data) {
					console.log('comment deleted');
					$scope.commentsPanel.getCommentsList(this.placeId);
				})
				.error(function(data, state) {
					console.log('api return error while trying to delete this comment');
				});
			};
		}
	};
	setInterval($scope.commentsPanel.getCommentsList(), 120000);
}]);
