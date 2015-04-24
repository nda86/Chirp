angular.module('mainCtrl',[]).controller('mainController',function($location, authUser){
	var vm = this;
	vm.message = '';

	vm.signin = function(){
		authUser.signin(vm.user.username, vm.user.password).success(function(data){
			if(data.success){
				$location.path('/posts');
			}else{
				vm.message = data.message;
			}
		})
	};

	vm.signup = function(){
		authUser.signup(vm.user.username, vm.user.password).success(function(data){
			if(data.success){
				$location.path('/posts');
			}else{
				vm.message = data.message;
			}
		})
	};

	vm.signout = function(){
		authUser.signout();
		$location.path('/');
	};

	vm.isLogged = function(){
		return authUser.isLogged();
	};

	authUser.getUser().success(function(data){
		vm.username = data;
	});


});