(function() {

'use strict';

angular.module('public')
.component('packageItems', {
  templateUrl: 'public/package/package.package-items.html',
  controller: PackageItemsComponentController,
  bindings: {
    items: '<'
  }
});

PackageItemsComponentController.$inject = ['$scope', 'DataService'];
function PackageItemsComponentController ($scope, DataService) {
  var $ctrl = this;

  $ctrl.putInfo = function(item, index) {
    item.data = {};
    item.data.status = ["checked"];
    var promise = DataService.putInfo(item);
    promise.then($ctrl.remove(index));
  }

  $ctrl.remove = function (index) {
    $ctrl.items.splice(index, 1);
  }

}

})();