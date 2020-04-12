(function() {

'use strict';

angular.module('public')
.component('agents', {
  templateUrl: 'public/assembly/agent-items.html',
  bindings: {
    agents:'<'
  },
  controller: AgentsComponentController
});

AgentsComponentController.$inject = ['$scope', '$state', '$stateParams', 'DataService'];
function AgentsComponentController($scope, $state, $stateParams, DataService){
  var $ctrl = this;

  $ctrl.$onInit = function() {
    $ctrl.color = $stateParams.agentData.deck;
    $ctrl.data = $stateParams;
  };

  $ctrl.putDataAndTransit = function(agent) {
    $ctrl.data.agentData.id = agent._id;
    $ctrl.data.elementData.agentWgt = agent.weight;
    $ctrl.data.elementData.status = ['assembled'];
    if (agent.weight) {
      DataService.putElementInfo($ctrl.data.elementData)
      .then(function(response) {
        $ctrl.data.agentData.weight = null;
        $ctrl.data.agentData.isEmpty = true;
      DataService.putAgentInfo($ctrl.data.agentData)
      .then(function(response) {
        console.log($ctrl);
        console.log($stateParams);
        $state.go('public.assembly.claddings', {"elementData": {"banch": $stateParams.elementData.banch}, "agentData": {"deck": $stateParams.agentData.deck}});
      });
    });
    }
  }
};

})();