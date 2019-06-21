(function() {

'use strict';

angular.module('public')
.component('foundItems', {
  templateUrl: 'public/incontroll/incontroll.founditems.html',
  controller: FoundItemsComponentController,
  bindings: {
    items: '<'
  }
});

//Component controller start
FoundItemsComponentController.$inject = ['$scope', 'DataService', '$rootScope'];
function FoundItemsComponentController ($scope, DataService, $rootScope) {
  var $ctrl = this;

  $scope.$on('item_created', function(event, obj) {
    $ctrl.items.push(obj);
  });

  $ctrl.putInfo = function(item, index) {
    var hight = 3510;
    var density = 1.8;
    item.data = {};
    item.data.diameter_three = parseFloat(item.diameter_three);
    item.data.diameter_four = parseFloat(item.diameter_four);
    item.data.diameter_avg = Math.round(((parseFloat(item.diameter_one) + parseFloat(item.diameter_two) + parseFloat(item.data.diameter_three) + parseFloat(item.data.diameter_four))/4).toPrecision(4)*100)/100;
    item.data.abs_weight_calc = parseFloat(((hight * density * 3.14 * (item.data.diameter_avg * item.data.diameter_avg)/4)/1000).toPrecision(4));
    item.data.nozzle_avg = Math.round(((parseFloat(item.data.diameter_three) + parseFloat(item.data.diameter_four))/2).toPrecision(4)*100)/100;
    var promise = DataService.putInfo(item)
    .then($ctrl.remove(index));
  }

  $ctrl.remove = function (index) {
    $ctrl.items.splice(index, 1);
  }
}


})();