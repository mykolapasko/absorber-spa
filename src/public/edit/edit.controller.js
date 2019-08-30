(function () {
"use strict";

angular.module('public')
.controller('EditController', EditController);

EditController.$inject = ['DataService', '$scope'];
function EditController(DataService, $scope) {
  var edCtrl = this;


  edCtrl.getItemsToEdit = function(banch, pipe) {
    var promise = DataService.getItemsToEdit(banch, pipe);
    promise.then(function(response) {
      edCtrl.items = response;
    });
  }

  edCtrl.getItemToEditContainer = function(stamp) {
    var promise = DataService.getItemToEditContainer(stamp);
    promise.then(function(response) {
      edCtrl.item = response;
    });
  }

}


})();