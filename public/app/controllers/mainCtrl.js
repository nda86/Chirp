angular.module('mainCtrl',[]).controller('mainController',function($location, authUser){
	var vm = this;
	vm.message = '';
	vm.str = 'hello';
	vm.signin = function(){
		authUser.signin(vm.user.username, vm.user.password).success(function(data){
			if(data.success){
				$location.path('/');
			}else{
				vm.message = data.message;
			}
		})
	};

	vm.signup = function(){
		authUser.signup(vm.user.username, vm.user.password).success(function(data){
			if(data.success){
				$location.path('/');
			}else{
				vm.message = data.message;
			}
		})
	}
})