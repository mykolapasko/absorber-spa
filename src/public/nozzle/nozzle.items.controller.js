(function () {
"use strict";

angular.module('public')
.controller('NozzleItemsController', NozzleItemsController);

NozzleItemsController.$inject = ['DataService', '$scope', '$stateParams', '$state', 'items'];
function NozzleItemsController(DataService, $scope, $stateParams, $state, items) {

  var itCtrl = this;

  itCtrl.$onInit = function() {
    itCtrl.items = items;
  };

}


})();