var authServices = angular.module('authServices',[]);

// authServices.factory('setCreds',function($cookies){
// 	return function(un,pw){
// 		var token = un.concat(':',pw);
// 		$cookies.userCreds = token;
// 		$cookies.userName = un;
// 	}
// });

// authServices.factory('checkCreds',function($cookies){
// 	return function(){
// 		var returnVal = false;
// 		var userCreds = $cookies.userCreds;
// 		if (userCreds !== undefined && userCreds !== ''){
// 			returnVal = true;
// 		}
// 		return returnVal;
// 	}
// });

// authServices.factory('deleteCreds',function($cookies){
// 	return function(){
// 		$cookies.userCreds = '';
// 		$cookies.userName = '';
// 	}
// });

// authServices.factory('getToken',function($cookies){
// 	return function(){
// 		var returnVal = '';
// 		var userCreds = $cookies.userCreds;
// 		if (userCreds !== undefined && $cookie.userCreds !== ''){
// 			returnVal = btoa(userCreds);
// 		};
// 		return returnVal;
// 	}
// });

// authServices.factory('getName',function($cookies){
// 	return function(){
// 		var returnVal = '';
// 		var userName = $cookies.userName;
// 		if (userName !== undefined && $cookie.userName !== ''){
// 			returnVal = userName;
// 		};
// 		return returnVal;
// 	}
// });


authServices.factory('authToken',function($window){
	var tokenFactory = {};
	tokenFactory.getToken =function(){
		return $window.localStorage.getItem('token');
	};

	tokenFactory.setToken = function(token){
		if (token){
			$window.localStorage.setItem('token',token);
		}else{
			$window.localStorage.removeItem('token');
		}
	};
	return tokenFactory;
});

authServices.factory('authUser',function(authToken, $http, $q){
	var userFactory = {};

	userFactory.signup = function(username, password){
		return $http.post('/auth/signup',{username: username, password: password}).success(function(data){
			// console.log(data);
			authToken.setToken(data.token);
			return data;
		})
	};

	userFactory.signin = function(username, password){
		return $http.post('/auth/signin',{username: username, password: password}).success(function(data){
			authToken.setToken(data.token);
			return data;
		});
	};

	userFactory.signout = function(){
		authToken.setToken();
	};

	userFactory.isLogged = function(){
		if (authToken.getToken()){
			return true;
		}else{
			return false;
		}
	};

	userFactory.getUser = function(){
		return $http.post('/auth/me');
	};

	return userFactory;

});


authServices.factory('authInterceptor', function($q, $location, authToken) {
	var interceptorFactory = {};
// this will happen on all HTTP requests
	interceptorFactory.request = function(config) {
// grab the token
	var token = authToken.getToken();
// if the token exists, add it to the header as x-access-token
	if (token) config.headers['x-access-token'] = token;
		return config;
	};
// happens on response errors
	interceptorFactory.responseError = function(response) {
// if our server returns a 403 forbidden response
	if (response.status == 403)
		$location.path('/signin');
// return the errors from the server as a promise
		return $q.reject(response);
	};
	return interceptorFactory;
});