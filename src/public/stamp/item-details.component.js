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

  // $ctrl.putData = function() {
  //   $ctrl.item.data.stamp = $ctrl.stamp;
  //   DataService.getCertainTip($ctrl.stamp)
  //   .then(function(response) {
  //     $ctrl.item.data.tipWgt = response[0].weight;
  //     DataService.putInfo($ctrl.item)
  //     .then(function(response){
  //       if (response.data.stamp) {
  //         $state.go('public.stamp.items', {'banch': $stateParams.banch})
  //       }
  //     })
  //   })
  // }

    $ctrl.putData = function() {
    $ctrl.item.data.stamp = $ctrl.stamp;
    DataService.putInfo($ctrl.item)
    .then(function(response){
      if (response.data.stamp) {
        $state.go('public.stamp.items', {'banch': $stateParams.banch})
      }
    })
  }

}


})();