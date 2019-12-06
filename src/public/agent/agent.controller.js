(function () {
"use strict";

angular.module('public')
.controller('AgentController', AgentController);

AgentController.$inject = ['$scope','DataService', 'agents'];
function AgentController($scope, DataService, agents) {
  var agCtrl = this;

  agCtrl.agents = agents;

}


})();