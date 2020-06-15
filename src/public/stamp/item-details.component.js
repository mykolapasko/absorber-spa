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
    console.log($ctrl);
  }

  $ctrl.goToItems = function() {
   $state.go('public.stamp.items', {'banch': $stateParams.banch});
  }

  $ctrl.putData = function() {
    $ctrl.item.data.stamp = $ctrl.stamp;
    DataService.putInfo($ctrl.item)
    .then($ctrl.goToItems());
  }




  // $ctrl.putData = function(item, index) {
  //   item.data = {};
  //   item.data.stamp = item.stamp;
  //   DataService.getCertainTip(item.stamp)
  //   .then(function(response) {
  //     item.data.tipWgt = response[0].weight;
  //   })
  //   .then(function(){
  //     DataService.putInfo(item);
  //   })
  //   .then(function(){
  //     $ctrl.remove(index);
  //   });
  // }

  // $ctrl.remove = function (index) {
  //   $ctrl.items.splice(index, 1);
  // }
}


})();