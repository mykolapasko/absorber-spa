(function () {
"use strict";

angular.module('public')

//Async validation of the uniqe "Pipe" value

.directive('nozzleExist', NozzleExist);

NozzleExist.$inject = ['$http', '$q', 'ApiPath'];
function NozzleExist($http, $q, ApiPath) {
  var ddo = {
    require: 'ngModel',
    link: function(scope, element, attrs, ngModel) {
      ngModel.$asyncValidators.NozzleExist = function(modelValue, viewValue) {
        return $http.get(ApiPath + '/tasks')
        .then(function(response) {
          return !response.data.some(function(currentValue) {
            return currentValue.nozzle === parseInt(modelValue);
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