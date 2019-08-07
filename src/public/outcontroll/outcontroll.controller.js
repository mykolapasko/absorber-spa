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
    console.log("Shoul update container here!");
    var promise = DataService.getContainer();
    promise.then(function(response){
    	outCtrl.last = response.last;
    	outCtrl.length = response.length;
    });
  });


  outCtrl.downloadPdf = function() {

    var externalDataRetrievedFromServer = outCtrl.pdfContent;

    function buildTableBody(data, columns) {
      var body = [];

      body.push(['Номер пэла', 'труба', 'партия', 'ср. даметер', 'вес', 'серия', 'плотность']);

      data.forEach(function(row) {
          var dataRow = [];

          columns.forEach(function(column) {
              dataRow.push(row[column].toString());
          })

          body.push(dataRow);
      });

      return body;
    }

    function table(data, columns) {
      return {
          table: {
              body: buildTableBody(data, columns)
          }
      };
    }

    var dd = {
      content: [
          { text: 'Dynamic parts', style: 'header' },
          table(externalDataRetrievedFromServer, ['stamp','pipe','container','diameter_avg', 'element_weight', 'serial', 'actual_absorber_density'])
      ]
    };

    pdfMake.createPdf(dd).download(outCtrl.searchContainer);
  }



  outCtrl.getItems = function(searchTerm) {
    var promise = DataService.getItemsToOutControll(searchTerm);
    promise.then(function (response) {
      outCtrl.items = response;
    });
  }

  outCtrl.getItemsToPdf = function(searchTerm) {
    var promise = DataService.getItemsToPdf(searchTerm);
    promise.then(function (response){
      outCtrl.pdfContent = response;
      outCtrl.downloadPdf();
    });
  }


}


})();