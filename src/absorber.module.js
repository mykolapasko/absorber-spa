(function() {

'use strict';

angular.module('absorber', ['public'])
.config(config);

config.$inject = ['$urlRouterProvider'];
function config($urlRouterProvider) {
	// If user goes to a path that doesn't exist, redirect to public root
	$urlRouterProvider.otherwise('/');
}
})();