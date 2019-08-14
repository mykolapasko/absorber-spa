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

    var doted_list = [];
    pdfCtrl.pdfContent.forEach(function(item) {
    	doted_list.push(' ' + item.stamp.toString() + '.19');
    });

    var dd = {
      content: [
          { 
          	text: 'Упаковочный лист',
          	style: 'header',
          	alignment: 'center' 
          },
          {
          	text: 'Элемент поглощающий 12-1-005.01\n\n',
          	style: 'header',
          	alignment: 'center'
          },
          {
          	text: '№№' + doted_list + '\nИтого: ' + doted_list.length + 'шт.\n\n',
          	italics: true,
          	fontSize: 14
          },
          {
          	text: 'Партия №' + pdfCtrl.pdfContent[0].container + '\nДоговор № ' +
          	'____________________________\n\n'
          },
          {
          	style: 'tableExample',
          	table: {
          		widths: [175, '*', 100, '*'],
          		body: [
          			['Ответственный за упаковку и комплектацию','','\nВ.В.Ворожко','']
          		]
          	},
          	layout: 'noBorders',
          	pageBreak: 'after'

          },

          table(externalDataRetrievedFromServer, ['stamp','pipe','container','diameter_avg', 'element_weight', 'serial', 'actual_absorber_density'])
      ],
      styles: {
      	header: {
      		fontSize: 18,
      		bold: true
      	},
      	tableExample: {
					margin: [0, 5, 0, 15]
				}
      }
    };

    pdfMake.createPdf(dd).download(pdfCtrl.searchTerm);
  }
}


})();