(function () {
"use strict";

angular.module('public')
.controller('HeightController', HeightController);

HeightController.$inject = ['$scope','DataService'];
function HeightController($scope, DataService) {
  var hgtCtrl = this;

  hgtCtrl.searchTerm = '';

  hgtCtrl.getItems = function(searchTerm) {
    var promise = DataService.getItemsToHeight(searchTerm);
    promise.then(function (response) {
      hgtCtrl.items = response;
    });
  }
}


})();