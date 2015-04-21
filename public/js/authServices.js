var authServices = angular.module('authServices',['ngCookies']);

authServices.factory('setCreds',function($cookies){
	return function(un,pw){
		var token = un.concat(':',pw);
		$cookies.userCreds = token;
		$cookies.userName = un;
	}
});

authServices.factory('checkCreds',function($cookies){
	return function(){
		var returnVal = false;
		var userCreds = $cookies.userCreds;
		if (userCreds !== undefined && userCreds !== ''){
			returnVal = true;
		}
		return returnVal;
	}
});

authServices.factory('deleteCreds',function($cookies){
	return function(){
		$cookies.userCreds = '';
		$cookies.userName = '';
	}
});

authServices.factory('getToken',function($cookies){
	return function(){
		var returnVal = '';
		var userCreds = $cookies.userCreds;
		if (userCreds !== undefined && $cookie.userCreds !== ''){
			returnVal = btoa(userCreds);
		};
		return returnVal;
	}
});

authServices.factory('getName',function($cookies){
	return function(){
		var returnVal = '';
		var userName = $cookies.userName;
		if (userName !== undefined && $cookie.userName !== ''){
			returnVal = userName;
		};
		return returnVal;
	}
});