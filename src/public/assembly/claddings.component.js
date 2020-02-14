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

CladdingsComponentController.$inject = ['$scope', '$state', '$stateParams', '$rootScope'];
function CladdingsComponentController($scope, $state, $stateParams, $rootScope){
  var $ctrl = this;

  $ctrl.$onInit = function() {
    console.log("banch: ", $scope.$parent.$parent.asCtrl.banch, "deck: ", $scope.$parent.$parent.asCtrl.deck);
  };

  $ctrl.goToAgents = function() {
    $state.go('public.assembly.agents');
  }
};

})();