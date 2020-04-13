(function () {
"use strict";

angular.module('public')

//Async validation of the uniqe "Pipe" value

.directive('nozzleExist', NozzleExist);

NozzleExist.$inject = ['$http', '$q'];
function NozzleExist($http, $q) {
  var ddo = {
    require: 'ngModel',
    link: function(scope, element, attrs, ngModel) {
      ngModel.$asyncValidators.NozzleExist = function(modelValue, viewValue) {
        return $http.get('http://192.168.0.1:3000/tasks')
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