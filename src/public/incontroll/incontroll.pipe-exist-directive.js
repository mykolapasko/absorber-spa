(function () {
"use strict";

angular.module('public')

//Async validation of the uniqe "Pipe" value

.directive('pipeExist', PipeExist);

PipeExist.$inject =['$http', '$q'];
function PipeExist($http, $q) {
  var ddo = {
    require: 'ngModel',
    link: function(scope, element, attrs, ngModel) {
      ngModel.$asyncValidators.PipeExist = function(modelValue, viewValue) {
        return $http.get('http://localhost:3000/tasks')
        .then(function(response) {
          return response.data.filter(function(item) {
            return item.banch === parseInt(scope.inCtrl.banch) && item.serial === parseInt(scope.inCtrl.serial);
          });
        })
        .then(function(response) {
          return !response.some(function(currentValue) {
            return currentValue.pipe === parseInt(modelValue);
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
  };

  return ddo;
}


})();