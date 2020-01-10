(function() {

'use strict';

angular.module('public')
.component('weightItems', {
  templateUrl: 'public/weight/weight.weight-items.html',
  controller: AssemblyDetailsComponentController,
  bindings: {
    items: '<'
  }
});

//Component controller start
WeightItemsComponentController.$inject = ['$scope', 'DataService'];
function WeightItemsComponentController ($scope, DataService) {
  var $ctrl = this;

  $ctrl.putInfo = function(myData, myIndex) {
    var promise = DataService.putInfo(myData);
    promise.then($ctrl.remove(myIndex));
  }

  $ctrl.remove = function (index) {
    $ctrl.items.splice(index, 1);
  }

}


})();