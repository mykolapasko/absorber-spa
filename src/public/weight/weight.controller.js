(function () {
"use strict";

angular.module('public')
.controller('WeightController', WeightController);

WeightController.$inject = ['DataService'];
function WeightController(DataService) {
  var wgtCtrl = this;

  wgtCtrl.getItems = function(searchTerm) {
    var promise = DataService.getItemsToWeight(searchTerm);
    promise.then(function (response) {
      wgtCtrl.items = response;
    });
  }

}


})();