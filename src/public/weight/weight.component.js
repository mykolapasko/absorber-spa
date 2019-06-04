(function() {

'use strict';

angular.module('public')
.component('weightItems', {
  templateUrl: 'public/weight/weight.weight-items.html',
  controller: WeightItemsComponentController,
  bindings: {
    items: '<'
  }
});

//Component controller start
WeightItemsComponentController.$inject = ['$scope', 'DataService'];
function WeightItemsComponentController ($scope, DataService) {
  var $ctrl = this;

  $ctrl.putInfo = function(item, index) {
    var hight = 3510;
    var density = 1.8;
    item.data = {};
    item.data.diameter_three = parseFloat(item.diameter_three);
    item.data.diameter_four = parseFloat(item.diameter_four);
    item.data.diameter_avg = Math.round(((parseFloat(item.diameter_one) + parseFloat(item.diameter_two) + parseFloat(item.data.diameter_three) + parseFloat(item.data.diameter_four))/4).toPrecision(4)*100)/100;
    item.data.abs_weight_calc = parseFloat(((hight * density * 3.14 * (item.data.diameter_avg * item.data.diameter_avg)/4)/1000).toPrecision(4));
    var promise = DataService.putInfo(item)
    .then($ctrl.remove(index));
  }

  $ctrl.remove = function (index) {
    $ctrl.items.splice(index, 1);
  }

  
}


})();