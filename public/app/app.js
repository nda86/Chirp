var chirpApp = angular.module('chirpApp',['app.routes','postServices','authServices','appDirectives','mainCtrl','postCtrl'])
.config(function($httpProvider){
	$httpProvider.interceptors.push('authInterceptor');
});