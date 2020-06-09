(function() {

'use strict';

angular.module('public')
.component('stampItems', {
  templateUrl: 'public/stamp/stamp.stamp-items.html',
  controller: StampItemsComponentController,
  bindings: {
    items: '<'
  }
});

//Component controller start
StampItemsComponentController.$inject = ['DataService', '$scope', '$rootScope', '$state', '$stateParams'];
function StampItemsComponentController (DataService, $scope, $rootScope, $state, $stateParams) {
  var $ctrl = this;

  $ctrl.$onInit = function() {
    // console.log($stateParams);
  }

  $ctrl.goToItemDetails = function(item) {
    $stateParams.itemId = item._id;
    console.log($stateParams);
   $state.go('public.stamp.items.details', {'itemId': item._id});
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