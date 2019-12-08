(function () {
"use strict";

angular.module('public')
.controller('DeckController', DeckController);

DeckController.$inject = ['$stateParams','agents', 'DataService'];
function DeckController($stateParams, agents, DataService) {
  var deckCtrl = this;
  deckCtrl.agents = agents.filter(function(agent) {
  	return agent.deck === $stateParams.deck;
  });

  deckCtrl.color = $stateParams.deck;

  deckCtrl.getRandomArbitrary = function(min, max) {
    return Math.random() * (max - min) + min;
  }

  deckCtrl.getWeightAndPutInfoAfter = function(agent, index) {
    agent.weight = parseFloat(deckCtrl.getRandomArbitrary(200, 250).toPrecision(4));
  	agent.isEmpty = false;
    agent.data = {};
    agent.data.weight = agent.weight;
    agent.data.isEmpty = agent.isEmpty;
    console.log(agent);
    var promise = DataService.putInfo(agent);
  }

}


})();