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

  edCtrl.getItemsToEditContainer = function(stamp) {
    var promise = DataService.getItemsToEditContainer(stamp);
    promise.then(function(response) {
      console.log(response);
      edCtrl.items = response;
    });
  }

}


})();