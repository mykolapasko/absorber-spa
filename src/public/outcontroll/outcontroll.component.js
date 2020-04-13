(function() {

'use strict';

angular.module('public')
.component('outcontrollItems', {
  templateUrl: 'public/outcontroll/outcontroll.outcontroll-items.html',
  controller: OutControllItemsComponentController,
  bindings: {
    items: '<'
  }
});

//Component controller start
OutControllItemsComponentController.$inject = ['$scope', 'DataService'];
function OutControllItemsComponentController ($scope, DataService) {
  var $ctrl = this;

  $ctrl.getElementWeight = function(item, index) {
    var promise = DataService.getElementWeight();
    promise.then(function(response) {
      item.data = {};
      item.data.element_weight = parseFloat(response.slice(2,8));
      item.data.expectedElementWgt = parseFloat(item.pipe_weight + item.tipWgt + item.agentWgt + item.absorber_weight).toPrecision(5);
    });
  }

  // $ctrl.getRandomArbitrary = function(min, max) {
  //   return Math.random() * (max - min) + min;
  // }

  // $ctrl.getElementWeight = function(item, index) {
  //   var promise = DataService.getElementWeight(item._id);
  //   promise.then(function(response) {
  //     item.data = {};
  //     item.data.element_weight = parseFloat(response.absorber_weight + 1700);
  //     item.data.expectedElementWgt = parseFloat(item.pipe_weight + item.tipWgt + item.agentWgt + item.absorber_weight).toPrecision(5);
  //   });
  // }


  $ctrl.putInfo = function(item, index) {
    item.data.container = $scope.$parent.outCtrl.last;
    item.data.status = ["completed"];
    var promise = DataService.putInfo(item);
    promise.then($ctrl.remove(index));
  }


  $ctrl.remove = function (index) {
    $ctrl.items.splice(index, 1);
  }

  
}


})();