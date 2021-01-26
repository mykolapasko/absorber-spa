(function() {
"use strict";

angular.module('common', [])
.constant('Password', 'enigma')
.constant('ApiPath', 'http://localhost:3000')
// .constant('ApiPath', 'http://192.168.0.1:3000')
.config(config);

config.$inject = ['$httpProvider'];
function config($httpProvider) {
  $httpProvider.interceptors.push('loadingHttpInterceptor');
}

})();
