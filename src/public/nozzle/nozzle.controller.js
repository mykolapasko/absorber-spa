(function () {
"use strict";

angular.module('public')
.controller('NozzleController', NozzleController);

NozzleController.$inject = ['DataService', '$scope', '$rootScope'];
function NozzleController(DataService, $scope, $rootScope) {
  var nzCtrl = this;


	$scope.$on('item_updated', function(event) {
    angular.element("#focusPipe").focus();
    nzCtrl.pipe = '';
  });

  nzCtrl.getItemsToNozzle = function(banch, pipe) {
    var promise = DataService.getItemsToNozzle(banch, pipe);
    promise.then(function(response) {
      nzCtrl.items = response;
    });
  }

}


})();