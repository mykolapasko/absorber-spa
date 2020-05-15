(function () {
"use strict";

angular.module('public')

//Async validation of the uniqe "Pipe" value

.directive('stampExist', StampExist);

StampExist.$inject = ['$http', '$q', 'ApiPath'];
function StampExist($http, $q, ApiPath) {
  var ddo = {
    require: 'ngModel',
    link: function(scope, element, attrs, ngModel) {
      ngModel.$asyncValidators.StampExist = function(modelValue, viewValue) {
        return $http.get(ApiPath + '/tasks')
        .then(function(response) {
          return !response.data.some(function(currentValue) {
            return currentValue.stamp === parseInt(modelValue);
          });
        })
        .then(function(response) {
          if (!response) {
            return $q.reject();
          }
          return true;
        });
      };
    }
  }

  return ddo;
}


})();