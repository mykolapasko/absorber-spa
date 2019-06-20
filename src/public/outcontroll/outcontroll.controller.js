(function () {
"use strict";

angular.module('public')
.controller('OutControllController', OutControllController);

OutControllController.$inject = ['DataService'];
function OutControllController(DataService) {
  var outCtrl = this;

  outCtrl.searchTerm = '';

  outCtrl.getItems = function(searchTerm) {
    var promise = DataService.getItemsToOutControll(searchTerm);
    promise.then(function (response) {
      outCtrl.items = response;
    });
  }

}


})();