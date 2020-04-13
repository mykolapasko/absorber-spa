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
  var weight;
  var hight;

  $ctrl.getElementWeight = function(item, index) {
    var promise = DataService.getElementWeight();
    promise.then(function(response) {
      weight = parseFloat(response.slice(2,8));
      console.log(weight);
      return weight;
    }).then(function(weight) {
      if (parseFloat(weight) < 600) {
        item.data = {};
        item.data.pipe_weight = weight;
        item.weight_1 = weight;
        item.productionStarted = Date.now();
      } else {
        item.productionFinished = Date.now();
        item.weight_2 = weight;
        item.weight_3 = parseFloat((item.weight_2 - item.weight_1 - 0.70).toPrecision(4));
        item.weight_delta = parseFloat((item.weight_3 - item.abs_weight_calc).toPrecision(4));
        item.data.absorber_weight = parseFloat((item.abs_weight_calc + item.weight_delta).toPrecision(4));
        item.data.status = ["ongoing"];
        item.data.productionInterval = (item.productionFinished - item.productionStarted)/1000;
        console.log(item.data);
      }
    });
  }

  // $ctrl.getRandomArbitrary = function(min, max) {
  //   return Math.random() * (max - min) + min;
  // }

  // $ctrl.getElementWeight = function(item) {
  //   if (!item.weight_1) {
  //     item.data = {};
  //     item.weight_1 = parseFloat($ctrl.getRandomArbitrary(445, 507).toPrecision(4));
  //     item.data.pipe_weight = item.weight_1;
  //     console.log(item.data);
  //     item.productionStarted = Date.now();
  //   } else {
  //     item.productionFinished = Date.now();
  //     item.weight_2 = parseFloat(($ctrl.getRandomArbitrary(item.abs_weight_calc, item.abs_weight_calc + 3) + item.weight_1).toPrecision(4));
  //     item.weight_diff = parseFloat((item.weight_2 - item.weight_1 - item.abs_weight_calc).toPrecision(2));
  //     item.data.absorber_weight = parseFloat((item.abs_weight_calc + item.weight_diff).toPrecision(4));
  //     item.data.status = ["ongoing"];
  //     item.data.productionInterval = (item.productionFinished - item.productionStarted)/1000;
  //   }

  //   console.log('item.weight_1: ', item.weight_1, 'item.weight_2: ', item.weight_2, 'item.weight_diff: ', item.weight_diff );
  // }

  $ctrl.getElementHight = function(item ,index) {
    var promise = DataService.getElementHight(item._id);
    promise.then(function(response) {
      hight = response.absorber_hight;
      return hight;
    }).then(function(hight) {
      item.data.absorber_hight = hight;
      item.data.actual_absorber_density = Math.round((item.data.absorber_weight/(7.85*item.diameter_avg*item.diameter_avg*item.data.absorber_hight)*1000).toPrecision(3)*100)/100;
    });
  }

  $ctrl.putInfo = function(myData, myIndex) {
    console.log(myData);
    var promise = DataService.putInfo(myData);
    promise.then($ctrl.remove(myIndex));
  }

  $ctrl.remove = function (index) {
    $ctrl.items.splice(index, 1);
  }

}


})();