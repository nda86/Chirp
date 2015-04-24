var postServices = angular.module('postServices',[]);

postServices.factory('postREST',function($http){

	var factory = {};

	factory.get = function(id){
		return $http.get('/api/posts/' + id);
	};
	factory.all = function(){
		return $http.get('/api/posts');
	};
	factory.create = function(user,text){
		return $http.post('/api/posts',{user: user, text: text});
	};

	return factory;
});
