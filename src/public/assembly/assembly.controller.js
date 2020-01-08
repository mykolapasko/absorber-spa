(function () {
"use strict";

angular.module('public')
.controller('AssemblyController', AssemblyController);

AssemblyController.$inject = ['DataService', '$scope'];
function AssemblyController(DataService, $scope) {
  var asCtrl = this;

  asCtrl.banch = '';
  asCtrl.deck = '';

  asCtrl.newValue = function(deck) {
    asCtrl.deck = deck;
    console.log(asCtrl.deck);
  };

  asCtrl.getCertainBanchAndDeck = function(banch, deck) {

    DataService.getBanchItems(banch)
    .then(function(response) {
      asCtrl.items = response;
      console.log(asCtrl.items);
    });

    DataService.getDeckAgents(deck)
    .then(function(response) {
      asCtrl.agents = response;
      console.log(asCtrl.agents);
    });
  };
}


})();