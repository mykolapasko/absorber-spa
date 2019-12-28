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

  deckCtrl.getWeightAndPutInfoAfter = function(agent, index) {
    var promise = DataService.getAgentWeight();
    promise.then(function(response) {
      var weight = parseFloat(response.slice(2,8));
      agent.weight = weight;
      agent.isEmpty = false;
      agent.data = {};
      agent.data.weight = weight;
      agent.data.isEmpty = agent.isEmpty;
      DataService.putInfoAgents(agent);
    });
  }



}


})();