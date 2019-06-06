(function () {
"use strict";

angular.module('public')
.controller('ReportController', ReportController);

ReportController.$inject = ['items', '$filter'];
function ReportController(items, $filter) {
  var repCtrl = this;

  repCtrl.$onInit = function() {
    repCtrl.propertyName = 'pipe';
    repCtrl.reverse = true;
    repCtrl.countItems = items.length;

  }

  repCtrl.items = $filter('orderBy')(items, repCtrl.propertyName, repCtrl.reverse);

  repCtrl.sortBy = function(propertyName) {
    repCtrl.reverse = (propertyName !== null && repCtrl.propertyName === propertyName) ? !repCtrl.reverse : false;
    repCtrl.propertyName = propertyName;
    repCtrl.items = $filter('orderBy')(items, repCtrl.propertyName, repCtrl.reverse);
  }

 

}


})();