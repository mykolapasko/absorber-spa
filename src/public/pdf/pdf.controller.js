(function () {
"use strict";

angular.module('public')
.controller('PDFController', PDFController);

PDFController.$inject = ['$scope','DataService'];
function PDFController($scope, DataService) {
  var pdfCtrl = this;

  pdfCtrl.searchTerm = '';

  pdfCtrl.getItemsToPdf = function(searchTerm) {
    var promise = DataService.getItemsToPdf(searchTerm);
    promise.then(function (response){
      pdfCtrl.pdfContent = response;
      pdfCtrl.downloadPdf();
    });
  }

  pdfCtrl.downloadPdf = function() {

    var externalDataRetrievedFromServer = pdfCtrl.pdfContent;

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
          { text: 'Dynamic parts' },
          table(externalDataRetrievedFromServer, ['stamp','pipe','container','diameter_avg', 'element_weight', 'serial', 'actual_absorber_density'])
      ]
    };

    pdfMake.createPdf(dd).download(pdfCtrl.searchTerm);
  }
}


})();