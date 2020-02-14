(function () {
"use strict";

angular.module('public')
.controller('AssemblyController', AssemblyController);

AssemblyController.$inject = ['DataService', '$scope', '$stateParams', '$state'];
function AssemblyController(DataService, $scope, $stateParams, $state) {

  var asCtrl = this;

  asCtrl.$onInit = function() {
    asCtrl.banch = '';
    asCtrl.deck = '';
    console.log("AssemblyController call!");
  };

  asCtrl.newValue = function(deck) {
    asCtrl.deck = deck;
    console.log(asCtrl.deck);
  };

  asCtrl.getBanchItems = function(banch) {
    var promise = DataService.getBanchItems(banch);
    promise.then(function(response) {
      asCtrl.items = response;
    });
    $state.go('public.assembly.claddings');
  }



}


})();