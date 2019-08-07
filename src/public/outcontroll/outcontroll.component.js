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

  // $ctrl.getElementWeight = function(item, index) {
  //   var promise = DataService.getElementWeight();
  //   promise.then(function(response) {
  //     item.data = {};
  //     item.data.element_weight = parseFloat(response.slice(2,8));
  //     item.data.status = ["completed"];
  //     console.log(item.data);
  //   });
  // }


  $ctrl.getElementWeight = function(item, index) {
    var promise = DataService.getElementWeight(item._id);
    promise.then(function(response) {
      console.log(response);
      item.data = {};
      item.data.element_weight = response.abs_weight_calc + 1700;
    });
  }


  $ctrl.putInfo = function(item, index) {
    console.log("last: ", $scope.$parent.outCtrl.last);
    console.log("length: ", $scope.$parent.outCtrl.length);
    item.data = {};
    item.data.container = $scope.$parent.outCtrl.last;
    var promise = DataService.putInfo(item);
    promise.then($ctrl.remove(index));
  }


  $ctrl.remove = function (index) {
    $ctrl.items.splice(index, 1);
  }

  
}


})();