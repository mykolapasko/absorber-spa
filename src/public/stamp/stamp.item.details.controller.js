(function () {
"use strict";

angular.module('public')
.controller('StampItemDetailsController', StampItemDetailsController);

StampItemDetailsController.$inject = ['DataService', '$scope', '$stateParams', '$state', 'item'];
function StampItemDetailsController(DataService, $scope, $stateParams, $state, item) {

  var detCtrl = this;

  detCtrl.$onInit = function() {
  	detCtrl.item = item;
  	detCtrl.item.data = {};
  };

  // detCtrl.goToStampItems = function() {
  //  $state.go('public.stamp.items', {'banch': $stateParams.banch});
  // }

  detCtrl.putItemStampAndGoToStampItems = function(item) {
  	detCtrl.item.data.id = detCtrl.item._id;
  	detCtrl.item.data.stamp = item.stamp;
  	DataService.putInfo(detCtrl.item.data)
  	.then(function(response) {
  		$state.go('public.stamp.items', {'banch': $stateParams.banch});
  	});
  }

}


})();