(function() {

'use strict';

angular.module('public')
.component('heightItems', {
  templateUrl: 'public/height/height.height-items.html',
  controller: HeightItemsComponentController,
  bindings: {
    items: '<'
  }
});

//Component controller start
HeightItemsComponentController.$inject = ['$scope', 'DataService'];
function HeightItemsComponentController ($scope, DataService) {
  var $ctrl = this;

  $ctrl.value = '';

  $ctrl.newValue = function(value, index, item) {
    $ctrl.value = value;
    item.data = {};
    item.data.absorber_hight = parseFloat(415 - parseFloat(value));
  }

  $ctrl.putInfo = function(item, index) {
    var promise = DataService.putInfo(item);
    promise.then($ctrl.remove(index));
  }


  $ctrl.remove = function (index) {
    $ctrl.items.splice(index, 1);
  }

  
}


})();