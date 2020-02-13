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

CladdingsComponentController.$inject = ['$scope', '$state', '$stateParams'];
function CladdingsComponentController($scope, $state, $stateParams){
  var $ctrl = this;

  $ctrl.$onInit = function() {
    console.log("Component call!");
    console.log('$stateParams: ', $stateParams);
    console.log('$state: ', $state);
  };
};

})();