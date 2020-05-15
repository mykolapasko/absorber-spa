(function () {
"use strict";

angular.module('public')

//Async validation of the uniqe "Pipe" value

.directive('pipeExist', PipeExist);

PipeExist.$inject =['$http', '$q', 'ApiPath'];
function PipeExist($http, $q, ApiPath) {
  var ddo = {
    require: 'ngModel',
    link: function(scope, element, attrs, ngModel) {
      ngModel.$asyncValidators.PipeExist = function(modelValue, viewValue) {
        return $http.get(ApiPath + '/tasks')
        .then(function(response) {
          return response.data.filter(function(item) {
            return item.serial === parseInt(scope.inCtrl.serial);
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