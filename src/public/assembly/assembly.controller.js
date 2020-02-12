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

  asCtrl.getStateParams = function(){
    console.log("$state: ", $state);
    console.log("$stateParams: ", $stateParams);
    $state.go('public.assembly.claddings', {banch: asCtrl.banch, deck: asCtrl.deck});
  }

}


})();