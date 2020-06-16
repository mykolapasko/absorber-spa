(function () {
"use strict";

angular.module('public')
.controller('StampController', StampController);

StampController.$inject = ['DataService', '$rootScope', '$scope', '$state', '$stateParams'];
function StampController(DataService, $rootScope, $scope, $state, $stateParams) {
  var stCtrl = this;

  stCtrl.$onInit = function() {
    stCtrl.banch = '';
  }

  stCtrl.goToStampItems = function() {
   $state.go('public.stamp.items', {'banch': stCtrl.banch});
  }

}


})();