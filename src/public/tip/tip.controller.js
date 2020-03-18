(function () {
"use strict";

angular.module('public')
.controller('TipController', TipController);

TipController.$inject = ['$scope','DataService', 'tips', '$rootScope'];
function TipController($scope, DataService, tips, $rootScope) {
  var tipCtrl = this;

  tipCtrl.tips = tips;

  tipCtrl.$onInit = function() {
  	  tipCtrl.data = {};
      tipCtrl.currentTip = tips[0].id + 1;
  }

  tipCtrl.getWeight = function() {
    console.log("Getting weight!");
  }

  $scope.$on('item_created', function(event, obj) {
    console.log("POST-hook");
    // angular.element("#focusPipe").focus();
  });

  tipCtrl.postInfo = function() {
    var postData = tipCtrl.data;
    postData.banch = tipCtrl.banch;
    postData.serial = tipCtrl.serial;
    postData.stamp_avg = Math.round(((parseFloat(tipCtrl.data.diameter_one) + parseFloat(tipCtrl.data.diameter_two))/2).toPrecision(4)*100)/100;
    var promise = DataService.postInfo(postData)
    .then(function() {
      tipCtrl.data = {};
    });
  }


}


})();