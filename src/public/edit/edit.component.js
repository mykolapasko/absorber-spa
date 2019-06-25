(function() {

'use strict';

angular.module('public')
.component('editItems', {
  templateUrl: 'public/edit/edit.edit-items.html',
  controller: EditItemsComponentController,
  bindings: {
    items: '<'
  }
});

//Component controller start
EditItemsComponentController.$inject = ['DataService', '$scope'];
function EditItemsComponentController (DataService, $scope) {
  var $ctrl = this;


  $ctrl.putInfo = function(item, index) {
    var hight = 3510;
    var density = 1.8;
    item.data = {};
    item.data.diameter_one = item.diameter_one;
    item.data.diameter_two = item.diameter_two;
    item.data.diameter_three = item.diameter_three;
    item.data.diameter_four = item.diameter_four;
    item.data.diameter_avg = Math.round(((parseFloat(item.data.diameter_one) + parseFloat(item.data.diameter_two) + parseFloat(item.data.diameter_three) + parseFloat(item.data.diameter_four))/4).toPrecision(4)*100)/100;
    item.data.abs_weight_calc = parseFloat(((hight * density * 3.14 * (item.data.diameter_avg * item.data.diameter_avg)/4)/1000).toPrecision(4));
    item.data.nozzle_avg = Math.round(((parseFloat(item.data.diameter_three) + parseFloat(item.data.diameter_four))/2).toPrecision(4)*100)/100;
    item.data.stamp_avg = Math.round(((parseFloat(item.data.diameter_one) + parseFloat(item.data.diameter_two))/2).toPrecision(4)*100)/100;
    var promise = DataService.putInfo(item)
    .then($ctrl.remove(index));
  }

  $ctrl.remove = function (index) {
    $ctrl.items.splice(index, 1);
  }
}


})();