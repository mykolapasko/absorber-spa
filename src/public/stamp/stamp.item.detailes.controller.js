(function () {
"use strict";

angular.module('public')
.controller('StampItemDetailsController', StampItemDetailsController);

StampItemDetailsController.$inject = ['DataService', '$scope', '$stateParams', '$state', 'item'];
function StampItemDetailsController(DataService, $scope, $stateParams, $state, item) {

  var detCtrl = this;

  detCtrl.$onInit = function() {
  	console.log("StampItemDetailsController call!");
  };

}


})();