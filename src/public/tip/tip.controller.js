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
      console.log(tips);
      tipCtrl.currentTip = tips[0].id + 1;
  }

  tipCtrl.getRandomArbitrary = function(min, max) {
     return Math.random() * (max - min) + min;
    }

  tipCtrl.getWeight = function() {
    tipCtrl.data.weight = parseFloat(tipCtrl.getRandomArbitrary(169, 171).toPrecision(4));
    console.log(tipCtrl.data.weight);
  }

  // tipCtrl.getWeight = function() {
  //  var promise =  DataService.getElementWeight();
  //  promise.then(function(response) {
  //  tipCtrl.data.weight = parseFloat(response.slice(2,8));
  //  console.log(tipCtrl.data);
  //  })
  // }
  

  $scope.$on('item_created', function(event, obj) {
    console.log("POST-hook");
    console.log(obj);
    tipCtrl.currentTip++;
    angular.element("#focusField").focus();
  });

  tipCtrl.postTipInfo = function() {
    tipCtrl.data.diameter_avg = Math.round(((parseFloat(tipCtrl.data.diameter_one) + parseFloat(tipCtrl.data.diameter_two))/2).toPrecision(4)*100)/100;
    tipCtrl.data.id = tipCtrl.currentTip;
    DataService.postTipInfo(tipCtrl.data)
    .then(function() {
      tipCtrl.data = {};
    });
  }


}


})();