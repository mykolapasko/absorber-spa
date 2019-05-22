(function () {
"use strict";

angular.module('public')
.controller('StampController', StampController);

StampController.$inject = ['DataService', '$rootScope', '$scope'];
function StampController(DataService, $rootScope, $scope) {
  var stCtrl = this;

  $scope.$on('item_updated', function(event) {
    angular.element("#focusPipe").focus();
    stCtrl.pipe = '';
  });

  stCtrl.getItemsToStamp = function(banch, pipe) {
    var promise = DataService.getItemsToNozzle(banch, pipe);
    promise.then(function(response) {
      stCtrl.items = response;
    });
  }

}


})();