(function () {
"use strict";

angular.module('public')
.controller('NozzleController', NozzleController);

NozzleController.$inject = ['DataService', '$rootScope', '$scope', '$state', '$stateParams'];
function NozzleController(DataService, $rootScope, $scope, $state, $stateParams) {
  var nzCtrl = this;

  nzCtrl.$onInit = function() {
    nzCtrl.banch = '';
  }

  nzCtrl.goToNozzleItems = function() {
   $state.go('public.nozzle.items', {'banch': nzCtrl.banch});
  }
}


})();