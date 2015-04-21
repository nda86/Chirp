var chirpApp = angular.module('chirpApp',['ngRoute','postServices','authServices','appControllers','appDirectives'])
	.run(function($rootScope,$http,deleteCreds){

		$rootScope.auth = false;
		$rootScope.current_user = '';

		$rootScope.signout = function(){

			$http.get('/auth/signout');
			$rootScope.auth = false;
			$rootScope.current_user = '';
			deleteCreds();

		}
	})

chirpApp.config(function($routeProvider, $locationProvider){
	$routeProvider
	//the timeline display
	.when('/', {
		templateUrl: 'main.html',
		controller: 'mainCtrl'
	})
	//the login display
	.when('/signin', {
		templateUrl: 'login.html',
		controller: 'authCtrl'
	})
	//the signup display
	.when('/signup', {
		templateUrl: 'register.html',
		controller: 'authCtrl'
	});
	$locationProvider.html5Mode({enabled: true, requireBase: false}).hashPrefix('!');
});