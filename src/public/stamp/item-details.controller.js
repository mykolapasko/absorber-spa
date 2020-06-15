(function () {
"use strict";

angular.module('public')
.controller('DetailsController', DetailsController);

DetailsController.$inject = ['DataService', '$scope', '$stateParams', '$state', 'item'];
function DetailsController(DataService, $scope, $stateParams, $state, item) {

  var detCtrl = this;

  detCtrl.$onInit = function() {
  	console.log("DetailsController call!");
    detCtrl.item = item;
  };

}


})();