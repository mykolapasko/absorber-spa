(function() {

'use strict';

angular.module('public')
.component('claddings', {
  templateUrl: 'public/assembly/clad-items.html',
  bindings: {
    items:'<'
  },
  controller: CladdingsComponentController
});

CladdingsComponentController.$inject = ['$scope', '$state', '$stateParams', 'DataService'];
function CladdingsComponentController($scope, $state, $stateParams, DataService){
  var $ctrl = this;

  $ctrl.$onInit = function() {
    console.log($stateParams);
  };

  $ctrl.goToAgents = function(item) {
  console.log("item: ", item);
    $state.go('public.assembly.agents', {"elementData": {"id": item._id, "banch": item.banch}});
  }
};

})();