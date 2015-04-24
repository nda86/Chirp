angular.module('postServices',['ngResource'])
.factory('postREST',function($http){
	var factory = {};
	factory.get = function(id){
		return $http.get('/api/posts/' + id);
	};
	factory.all = function(){
		return $http.get('/api/posts');
	};
	factory.create = function(post){
		return $http.post('/api/posts',post);
	};

	return factory;
});
