(function () {
"use strict";

angular.module('common')

//Async validation of the uniqe "Pipe" value

.directive('autoFocus', AutoFocus);

AutoFocus.$inject = ['$timeout'];
function AutoFocus($timeout) {
  return {
    restrict: 'AC',
    link: function(scope, element) {
      $timeout(function(){
        element[0].focus();
      }, 0);
    }
  };
}


})();