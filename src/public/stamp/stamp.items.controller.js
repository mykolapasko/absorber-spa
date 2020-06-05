(function () {
"use strict";

angular.module('public')
.controller('StampItemsController', StampItemsController);

StampItemsController.$inject = ['DataService', '$scope', '$stateParams', '$state', 'items'];
function StampItemsController(DataService, $scope, $stateParams, $state, items) {

  var itCtrl = this;

  itCtrl.$onInit = function() {
  	console.log("StampItemsController call!");
    itCtrl.items = items;
  };

}


})();