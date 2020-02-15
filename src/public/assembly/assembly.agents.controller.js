(function () {
"use strict";

angular.module('public')
.controller('AssemblyAgentsController', AssemblyAgentsController);

AssemblyAgentsController.$inject = ['DataService', '$scope', '$stateParams', '$state', 'agents'];
function AssemblyAgentsController(DataService, $scope, $stateParams, $state, agents) {

  var asagCtrl = this;

  asagCtrl.$onInit = function() {
    asagCtrl.agents = agents;
    console.log(agents);
  };

}


})();