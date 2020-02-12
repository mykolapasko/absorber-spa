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

AgentsComponentController.$inject = ['$scope', '$state', '$stateParams'];
function AgentsComponentController($scope, $state, $stateParams){
  var $ctrl = this;

  $ctrl.$onInit = function() {
    console.log("Component call!");
    console.log("$state: ", $state);
  };
};

})();