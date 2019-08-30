(function() {

'use strict';

angular.module('public')
.component('editItems', {
  templateUrl: 'public/edit/edit.edit-items.html',
  controller: EditItemsComponentController,
  bindings: {
    items: '<'
  }
})
.component('editItem', {
  templateUrl: 'public/edit/edit.edit-item.html',
  controller: EditItemComponentController,
  bindings: {
    item: '<'
  }
});

//Component controller start
EditItemsComponentController.$inject = ['DataService', '$scope'];
function EditItemsComponentController (DataService, $scope) {
  var $ctrl = this;

  $ctrl.$onInit = function() {
    $ctrl.data = {
      status: null,
      pending: 'pending',
      ongoing: 'ongoing',
      completed: 'completed',
      checked: 'checked',
      defect: 'defect'
    }
  }

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
    item.data.pipe = item.pipe;
    console.log(item.data);
    var promise = DataService.putInfo(item)
    .then($ctrl.remove(index));
  }



  $ctrl.remove = function (index) {
    $ctrl.items.splice(index, 1);
  }
}

EditItemComponentController.$inject = ['DataService', '$scope'];
function EditItemComponentController (DataService, $scope) {
  var $ctrl = this;

  $ctrl.$onInit = function() {
    $ctrl.data = {
      status: null,
      pending: 'pending',
      ongoing: 'ongoing',
      completed: 'completed',
      checked: 'checked',
      defect: 'defect',
      reserve: 'reserve'
    }
  }

  $ctrl.putInfo = function(item, index) {
    console.log(item);
    item.data = {};
    item.data.container = item.container;
    item.data.status = $ctrl.data.status;
    console.log(item.data);
    var promise = DataService.putInfo(item)
    .then($ctrl.remove(index));
  }

  $ctrl.remove = function (index) {
    $ctrl.item.splice(index, 1);
  }
}


})();