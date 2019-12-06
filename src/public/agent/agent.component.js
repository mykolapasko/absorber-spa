(function() {

'use strict';

angular.module('public')
.component('agentItems', {
  templateUrl: 'public/agent/agent.agent-items.html',
  controller: AgentItemsComponentController,
  bindings: {
    agents: '<'
  }
});

AgentItemsComponentController.$inject = ['$scope', 'DataService'];
function AgentItemsComponentController ($scope, DataService) {
  var $ctrl = this;

  $ctrl.putInfo = function(item, index) {
    item.data = {};
    item.data.status = ["checked"];
    var promise = DataService.putInfo(item);
    promise.then($ctrl.remove(index));
  }

}

})();