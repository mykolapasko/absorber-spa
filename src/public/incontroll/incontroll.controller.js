(function () {
"use strict";

angular.module('public')
.controller('InControllController', InControllController);

InControllController.$inject = ['$scope','DataService', 'items', '$rootScope'];
function InControllController($scope, DataService, items, $rootScope) {
  var inCtrl = this;

  inCtrl.items = items;

  inCtrl.$onInit = function () {
  	  inCtrl.data = {};
  }

  $scope.$on('item_created', function(event, obj) {
    angular.element("#focusPipe").focus();
  });

  inCtrl.postInfo = function() {
    var postData = inCtrl.data;
    postData.banch = inCtrl.banch;
    postData.serial = inCtrl.serial;
    postData.nozzle_avg = Math.round(((parseFloat(inCtrl.data.diameter_one) + parseFloat(inCtrl.data.diameter_two))/2).toPrecision(4)*100)/100;
    var promise = DataService.postInfo(postData)
    .then(function() {
      inCtrl.data = {};
    });
  }


}


})();