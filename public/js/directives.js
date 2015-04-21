var appDirectives = angular.module('appDirectives',[]);

appDirectives.directive('appMenu',function(){
	return {
		restrict: 'A',
		templateUrl: 'partials/menu.html',
		link: function(scope,el,attrs){
			scope.label1 = attrs.menuTitle;
		}
	}
})