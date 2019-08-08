(function () {
"use strict";

angular.module('public')
.controller('PackageController', PackageController);

PackageController.$inject = ['$scope','DataService'];
function PackageController($scope, DataService) {
  var pckCtrl = this;

  pckCtrl.searchTerm = '';

  pckCtrl.getItemsToPackage = function(searchTerm) {
    var promise = DataService.getItemsToPackage(searchTerm);
    promise.then(function (response) {
      pckCtrl.items = response;
    });
  }
}


})();