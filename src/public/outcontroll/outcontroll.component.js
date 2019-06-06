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
      item.data.status = ["completed"];
      console.log(item.data);
    });
  }

  $ctrl.putInfo = function(myData, myIndex) {
    var promise = DataService.putInfo(myData);
    console.log(myData);
    promise.then($ctrl.remove(myIndex));
  }


  $ctrl.remove = function (index) {
    $ctrl.items.splice(index, 1);
  }

  
}


})();