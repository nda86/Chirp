var chirpApp = angular.module('chirpApp',['appDirectives']);
chirpApp.controller('TestCtrl',function(){
	var vm = this;
	vm.hello = 'Hello World';
})