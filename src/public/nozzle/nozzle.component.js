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
NozzleItemsComponentController.$inject = ['DataService', '$rootScope', '$scope'];
function NozzleItemsComponentController (DataService, $rootScope, $scope) {
  var $ctrl = this;

  $ctrl.putInfo = function(item, index) {
    item.data = {};
    item.data.nozzle = item.nozzle;
    var promise = DataService.putInfo(item)
    .then($ctrl.remove(index));
  }

  $ctrl.remove = function (index) {
    $ctrl.items.splice(index, 1);
  }
}


})();