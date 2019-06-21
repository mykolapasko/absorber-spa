(function () {
"use strict";

angular.module('public')
.controller('NozzleController', NozzleController);

NozzleController.$inject = ['DataService', '$scope', '$rootScope'];
function NozzleController(DataService, $scope, $rootScope) {
  var nzCtrl = this;

  nzCtrl.added_items = [];


	$scope.$on('item_updated', function(event) {
    angular.element("#focusPipe").focus();
    nzCtrl.pipe = '';
  });

  nzCtrl.getItemsToNozzle = function(banch, pipe) {
    var promise = DataService.getItemsToNozzle(banch, pipe);
    promise.then(function(response) {
      if (! nzCtrl.added_items.some(function(item){return item._id === response[0]._id}))
      {
        nzCtrl.added_items.push(response[0]);
      }
      console.log(nzCtrl.added_items);
      angular.element("#focusPipe").focus();
      nzCtrl.pipe = '';
    });
  }

}


})();