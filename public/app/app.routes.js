angular.module('app.routes',['ngRoute']).config(function($routeProvider, $locationProvider){
	$routeProvider
	.when('/', {
		template: 'app/views/pages/main.html'
		// controller: 'mainCtrl'
	})
	.when('/signin', {
		templateUrl: 'app/views/pages/login.html',
		controller: 'mainController',
		controllerAs: 'signin'
	})
	.when('/signup', {
		templateUrl: 'app/views/pages/register.html',
		controller: 'mainController',
		controllerAs: 'signup'
	});
	$locationProvider.html5Mode(true);
});