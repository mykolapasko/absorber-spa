(function () {
"use strict";

angular.module('public')
.controller('OutControllController', OutControllController);

OutControllController.$inject = ['$scope','DataService', 'container', '$rootScope'];
function OutControllController($scope, DataService, container, $rootScope) {
  var outCtrl = this;

  outCtrl.searchTerm = '';
  outCtrl.searchContainer = '';
  outCtrl.last = container.last;
  outCtrl.length = container.length;
  outCtrl.pdfContent='';


  $scope.$on('item_updated', function(event, obj) {
    var promise = DataService.getContainer();
    promise.then(function(response){
    	outCtrl.last = response.last;
    	outCtrl.length = response.length;
    });
  });

  outCtrl.getItems = function(searchTerm) {
    var promise = DataService.getItemsToOutControll(searchTerm);
    promise.then(function (response) {
      outCtrl.items = response;
    });
  }

}


})();