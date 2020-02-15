(function () {
"use strict";

angular.module('public')
.controller('CladdingsController', CladdingsController);

CladdingsController.$inject = ['DataService', '$scope', '$stateParams', '$state', 'items'];
function CladdingsController(DataService, $scope, $stateParams, $state, items) {

  var cladCtrl = this;

  cladCtrl.$onInit = function() {
    cladCtrl.items = items;
  };

}


})();