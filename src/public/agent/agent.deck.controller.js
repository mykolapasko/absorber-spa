(function () {
"use strict";

angular.module('public')
.controller('DeckController', DeckController);

DeckController.$inject = ['$stateParams','agents'];
function DeckController($stateParams, agents) {
  var deckCtrl = this;
  deckCtrl.agents = agents.filter(function(item) {
  	return item.deck === $stateParams.deck;
  });

  deckCtrl.color = $stateParams.deck;
  console.log(deckCtrl.color);

  deckCtrl.getWeightAndPutInfoAfter = function(item, index) {
  	item.isEmpty = false;
  	console.log(item, index);
  }

}


})();