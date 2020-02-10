(function () {
"use strict";

angular.module('public')
.controller('AssemblyController', AssemblyController);

AssemblyController.$inject = ['DataService', '$scope'];
function AssemblyController(DataService, $scope) {

  var asCtrl = this;

  asCtrl.$onInit = function() {
    asCtrl.banch = '';
    asCtrl.deck = '';
  };

  asCtrl.newValue = function(deck) {
    asCtrl.deck = deck;
    console.log(asCtrl.deck);
  };

}


})();