(function() {

'use strict';

angular.module('public')
.component('nozzleItemDetails', {
  templateUrl: 'public/nozzle/nozzle.item.details.html',
  controller: NozzleItemDetailsComponentController,
  bindings: {
    item: '<'
  }
});

//Component controller start
NozzleItemDetailsComponentController.$inject = ['DataService', '$state', '$stateParams'];
function NozzleItemDetailsComponentController (DataService, $state, $stateParams) {
  var $ctrl = this;

  $ctrl.$onInit = function() {
    $ctrl.nozzle = '';
    $ctrl.item.data = {};
  }

  $ctrl.putData = function() {
    $ctrl.item.data.nozzle = $ctrl.nozzle;
    var promise = DataService.putInfo($ctrl.item);
    promise.then(function(response) {
      if (response.data.nozzle) {
        $state.go('public.nozzle.items', {'banch': $stateParams.banch})
      }
    })
  }

}


})();