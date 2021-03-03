(function () {
    "use strict";
    
    angular.module('public')
    .controller('AssemblyAgentController', AssemblyAgentController);
    
    AssemblyAgentController.$inject = ['agent'];
    function AssemblyAgentController(agent) {
    
      var asagtCtrl = this;
    
      asagtCtrl.$onInit = function() {
        asagtCtrl.agent = agent;
        console.log(asagtCtrl.agent);
      };
    
    }
    
    
    })();