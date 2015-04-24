angular.module('app.routes',['ngRoute']).config(function($routeProvider, $locationProvider){
	$routeProvider
	.when('/', {
		templateUrl: 'app/views/pages/home.html'
	})
	.when('/posts', {
		templateUrl: 'app/views/pages/posts.html',
		controller: 'postController',
		controllerAs: 'postC'
	})
	.when('/signin', {
		templateUrl: 'app/views/pages/signin.html',
		controller: 'mainController',
		controllerAs: 'signin'
	})
	.when('/signup', {
		templateUrl: 'app/views/pages/signup.html',
		controller: 'mainController',
		controllerAs: 'signup'
	});
	$locationProvider.html5Mode(true);
});