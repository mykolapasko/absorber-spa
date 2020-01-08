(function() {

'use strict';

angular.module('public')
.component('agents', {
  controller: AgentsComponentController,
  bindings: {
    agents: '<'
  }
});

//Component controller start
AgentsComponentController.$inject = ['$scope', 'DataService'];
function AgentsComponentController ($scope, DataService) {
  var $ctrl = this;


  $ctrl.putInfo = function(myData, myIndex) {
    var promise = DataService.putInfo(myData);
    promise.then($ctrl.remove(myIndex));
  }

  $ctrl.remove = function (index) {
    $ctrl.items.splice(index, 1);
  }

}


})();