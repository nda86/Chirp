var postServices = angular.module('postServices',['ngResource']);

postServices.factory('postREST',function($resource){
	return $resource('/api/posts/:id');
});
