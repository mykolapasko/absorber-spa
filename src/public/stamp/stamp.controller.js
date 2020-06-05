(function () {
"use strict";

angular.module('public')
.controller('StampController', StampController);

StampController.$inject = ['DataService', '$rootScope', '$scope', '$state', '$stateParams'];
function StampController(DataService, $rootScope, $scope, $state, $stateParams) {
  var stCtrl = this;

  stCtrl.$onInit = function() {
    stCtrl.banch = '';
  }

  // stCtrl.added_items = [];

  // $scope.$on('item_updated', function(event) {
  //   angular.element("#focusPipe").focus();
  //   stCtrl.pipe = '';
  // });

  // stCtrl.getItemsToStamp = function(banch, pipe) {
  //   var promise = DataService.getItemsToNozzle(banch, pipe);
  //   promise.then(function(response) {
  //     if (! stCtrl.added_items.some(function(item){return item._id === response[0]._id}))
  //     {
  //       stCtrl.added_items.push(response[0]);
  //     }
  //     console.log(stCtrl.added_items);
  //     angular.element("#focusPipe").focus();
  //     stCtrl.pipe = '';
  //   });
  // }

  stCtrl.goToStampItems = function() {
   $state.go('public.stamp.items', {'banch': stCtrl.banch});
  }

}


})();