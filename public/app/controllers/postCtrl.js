angular.module('postCtrl',[])
.controller('postController',function(postREST,authUser){
	var vm = this;
	vm.posts = [];
	vm.username = '';
	postREST.all().success(function(data){
		vm.posts = data;
	});

	authUser.getUser().success(function(data){
		vm.username = data;
	});

	vm.send = function(){
		postREST.create(vm.username, vm.newPost.text).success(function(data){
			postREST.all().success(function(data){
				vm.newPost.text = '';
				vm.posts = data;
			});
		});
	};

});