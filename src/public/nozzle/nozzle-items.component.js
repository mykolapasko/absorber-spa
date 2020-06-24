(function() {

'use strict';

angular.module('public')
.component('nozzleItems', {
  templateUrl: 'public/nozzle/nozzle.nozzle-items.html',
  controller: NozzleItemsComponentController,
  bindings: {
    items: '<'
  }
});

//Component controller start
NozzleItemsComponentController.$inject = ['DataService', '$scope', '$rootScope', '$state', '$stateParams'];
function NozzleItemsComponentController (DataService, $scope, $rootScope, $state, $stateParams) {
  var $ctrl = this;

  $ctrl.currentBanch = $stateParams.banch;

  $ctrl.goToItemDetails = function(item) {
   $state.go('public.nozzle.details', {'itemId': item._id});
  }

}


})();