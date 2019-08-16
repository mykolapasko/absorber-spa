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

      body.push([
                  {
                    text:'номер',
                    fontSize: 10
                  }, 
                  {
                    text:'труба',
                    fontSize:10
                  },
                  { 
                    text:'диаметр',
                    fontSize:10
                  }, 
                  {
                    text:'вес',
                    fontSize:10
                  },
                  { 
                    text:'высота',
                    fontSize:10
                  }, 
                  {
                    text:'плотность',
                    fontSize:10
                  },
                  {
                    text:'вес пэл',
                    fontSize:10
                  },
                  {
                    text:'серия',
                    fontSize:10
                  },
                  {
                    text:'контейнер',
                    fontSize:10
                  }
                ]);

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
            },
          layout: {
            hLineWidth: function (i, node) {
              return (i === 0 || i === node.table.body.length) ? 0 : 0;
            },
            vLineWidth: function (i, node) {
              return (i === 0 || i === node.table.widths.length) ? 0 : 0;
            },
            fillColor: function (rowIndex, node, columnIndex) {
              return (rowIndex % 2 === 0) ? '#eee' : null;
            }
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
          			['Ответственный за упаковку и комплектацию','','\nВ.В. Ворожко','']
          		]
          	},
          	layout: 'noBorders',
          	pageBreak: 'after'
          },

          table(externalDataRetrievedFromServer, ['stamp', 'pipe', 'diameter_avg', 'absorber_weight', 'absorber_hight', 'actual_absorber_density', 'element_weight', 'serial', 'container'])
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