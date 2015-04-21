var appControllers = angular.module('appControllers',[])

appControllers.controller('mainCtrl',function($scope,$rootScope,postREST,checkCreds){
	if (checkCreds()){
		$scope.posts = postREST.query();
		$scope.send = function(){
			$scope.newPost.user = $rootScope.current_user;
			// $scope.newPost.createdAt = Date.now();
			postREST.save($scope.newPost, function(data){
				$scope.posts = postREST.query();
				$scope.newPost = {
					user: '',
					text: ''
					// createdAt: ''
				};
			})
		}
	}
});

appControllers.controller('authCtrl',function($scope,$rootScope,$location,$http,setCreds){
	$scope.user = {
		username: '',
		password: ''
	};
	$scope.user.message = '';

	$scope.signin = function(){
		$http.post('/auth/signin',$scope.user).success(function(data){
			if (data.success === false){
				$scope.user.message = data.message;
			}else{
				setCreds($scope.user.username, $scope.user.password)
				$rootScope.current_user = data.user;
				$rootScope.auth = true;
				$location.path('/');
			}
		})
	};

	$scope.signup = function(){
		$http.post('/auth/signup',$scope.user).success(function(data){
			if (data.success === false){
				$scope.user.message = data.message;
			}else{
				$rootScope.current_user = data.user;
				$rootScope.auth = true;
				$location.path('/');
			}
		})
	};
});