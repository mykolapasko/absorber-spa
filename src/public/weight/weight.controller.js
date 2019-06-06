(function () {
"use strict";

angular.module('public')
.controller('WeightController', WeightController);

WeightController.$inject = ['DataService'];
function WeightController(DataService) {
  var wgtCtrl = this;

  wgtCtrl.searchTerm = '';

  wgtCtrl.getItems = function(searchTerm) {
    var promise = DataService.getItemsToWeight(searchTerm);
    promise.then(function (response) {
      wgtCtrl.items = response;
    });
  }

  wgtCtrl.removeItem = function(index) {
    menu.found.splice(index, 1);
  }

}


})();