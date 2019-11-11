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
StampItemsComponentController.$inject = ['DataService', '$scope', '$rootScope'];
function StampItemsComponentController (DataService, $scope, $rootScope) {
  var $ctrl = this;

  $ctrl.putInfo = function(item, index) {
    item.data = {};
    item.data.stamp = item.stamp;
    var promise = DataService.putInfo(item)
    .then($ctrl.remove(index));
  }

  $ctrl.remove = function (index) {
    $ctrl.items.splice(index, 1);
  }
}


})();