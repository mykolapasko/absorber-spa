(function () {
"use strict";

angular.module('public')
.controller('NozzleDetailsController', NozzleDetailsController);

NozzleDetailsController.$inject = ['DataService', '$scope', '$stateParams', '$state', 'item'];
function NozzleDetailsController(DataService, $scope, $stateParams, $state, item) {

  var detCtrl = this;

  detCtrl.$onInit = function() {
    detCtrl.item = item;
  };

}


})();