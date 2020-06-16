(function() {

'use strict';

angular.module('public')
.component('itemDetails', {
  templateUrl: 'public/stamp/stamp.item.details.html',
  controller: ItemDetailsComponentController,
  bindings: {
    item: '<'
  }
});

//Component controller start
ItemDetailsComponentController.$inject = ['DataService', '$state', '$stateParams'];
function ItemDetailsComponentController (DataService, $state, $stateParams) {
  var $ctrl = this;

  $ctrl.$onInit = function() {
    $ctrl.stamp = '';
    $ctrl.item.data = {};
  }

  $ctrl.goToItems = function() {
   $state.go('public.stamp.items', {'banch': $stateParams.banch});
  }

  $ctrl.putData = function() {
    $ctrl.item.data.stamp = $ctrl.stamp;
    DataService.putInfo($ctrl.item)
    .then($ctrl.goToItems());
  }

}


})();