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
  }

  $ctrl.goToItemDetails = function(item) {
   $state.go('public.stamp.details', {'itemId': item._id});
  }

}


})();