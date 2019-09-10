(function () {
"use strict";

angular.module('public')
.controller('StampController', StampController);

StampController.$inject = ['DataService', '$rootScope', '$scope'];
function StampController(DataService, $rootScope, $scope) {
  var stCtrl = this;

  stCtrl.added_items = [];

  $scope.$on('item_updated', function(event) {
    angular.element("#focusPipe").focus();
    stCtrl.pipe = '';
  });

  stCtrl.getItemsToStamp = function(banch, pipe) {
    var promise = DataService.getItemsToNozzle(banch, pipe);
    promise.then(function(response) {
      if (! stCtrl.added_items.some(function(item){return item._id === response[0]._id}))
      stCtrl.items = response;
      {
        stCtrl.added_items.push(response[0]);
      }
      console.log(stCtrl.added_items);
      angular.element("#focusPipe").focus();
      stCtrl.pipe = '';
    });
  }

}


})();