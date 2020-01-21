(function () {
"use strict";

angular.module('public')
.controller('PDFController', PDFController);

PDFController.$inject = ['$scope','DataService'];
function PDFController($scope, DataService) {
  var pdfCtrl = this;

  pdfCtrl.searchTerm = '';
  pdfCtrl.banch = '';

  pdfCtrl.getItemsToPdf = function(searchTerm) {
    var promise = DataService.getItemsToPdf(searchTerm);
    promise.then(function (response){
      pdfCtrl.pdfContent = response;
      pdfCtrl.downloadPdf();
    });
  }

  pdfCtrl.downloadPdf = function() {

    var externalDataRetrievedFromServer = pdfCtrl.pdfContent;

    var doted_list = [];
    pdfCtrl.pdfContent.forEach(function(item) {
    	doted_list.push(' ' + item.stamp.toString() + '.20');
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
          	text: 'Партия №' + pdfCtrl.searchTerm + '\nДоговор № ' +
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
          	layout: 'noBorders'
          }
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

    pdfCtrl.getBanchItemsToPdf = function(banch) {
    var promise = DataService.getBanchItemsToPdf(banch);
    promise.then(function(response) {
      pdfCtrl.pdfContent = response;
      pdfCtrl.downloadBanchPdf();
    });
  }

  pdfCtrl.downloadBanchPdf = function() {
    var externalDataRetrievedFromServer = pdfCtrl.pdfContent;
    function buildTableBody(data, columns) {
      var body = [];

      body.push([
                  {
                    text:'pipe',
                    fontSize: 15
                  }, 
                  { 
                    text:'stamp',
                    fontSize:15
                  },
                  {
                    text:'nozzle',
                    fontSize:15
                  }, 
                  {
                    text: 'nozzle_avg',
                    fontSize: 15
                  },
                  {
                    text: 'stamp_avg',
                    fontSize: 15
                  },
                  {
                    text: 'd_avg',
                    fontSize: 15
                  },
                  {
                    text:'serial',
                    fontSize:15
                  }
                ]);

      data.forEach(function(row) {
          var dataRow = [];

          columns.forEach(function(column) {
            if (row[column]) {
              dataRow.push(row[column].toString());
            } else {
              dataRow.push('');
            }
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
      };

      var dd = {
      content: [
          { 
            text: 'Banch: ' + pdfCtrl.banch + ', Qty: ' +  externalDataRetrievedFromServer.length,
            style: 'header',
            alignment: 'center' 
          },
         

          table(externalDataRetrievedFromServer, ['pipe', 'stamp', 'nozzle', 'nozzle_avg', 'stamp_avg', ,'diameter_avg','serial'])
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true,
          margin: [0,0,0,30]
        },
        tableExample: {
          margin: [0, 5, 0, 15]
        }
      }
    };

    pdfMake.createPdf(dd).download(pdfCtrl.banch);
  };


}


})();