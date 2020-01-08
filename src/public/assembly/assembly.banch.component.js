(function() {

'use strict';

angular.module('public')
.component('banch', {
  templateUrl: 'public/assembly/banch.html',
  controller: WeightItemsComponentController,
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