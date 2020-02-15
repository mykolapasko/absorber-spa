(function() {
'use strict';

angular.module('public')
.config(routeConfig);

/**
 * Configures the routes and views
 */
routeConfig.$inject = ['$stateProvider'];
function routeConfig ($stateProvider) {
  // Routes
  $stateProvider
    .state('public', {
      absract: true,
      templateUrl: 'public/public.html'
    })
    .state('public.home', {
      url: '/',
      templateUrl: 'public/home/home.html'
    })
    .state('public.incontroll', {
      url: '/incontroll',
      templateUrl: 'public/incontroll/incontroll.html',
      controller: 'InControllController as inCtrl',
      resolve: {
        items: ['DataService', function (DataService) {
          return DataService.getItemsToInControll();
        }]
      }
    })
    .state('public.nozzle', {
      url: '/nozzle',
      templateUrl: 'public/nozzle/nozzle.html',
      controller: 'NozzleController as nzCtrl'
    })
    .state('public.stamp', {
      url: '/stamp',
      templateUrl: 'public/stamp/stamp.html',
      controller: 'StampController as stCtrl'
    })
    .state('public.weight', {
      url: '/weight',
      templateUrl: 'public/weight/weight.html',
      controller: 'WeightController as wgtCtrl'
    })
    .state('public.height', {
      url: '/height',
      templateUrl: 'public/height/height.html',
      controller: 'HeightController as hgtCtrl'
    })
    .state('public.outcontroll', {
      url: '/outcontroll',
      templateUrl: 'public/outcontroll/outcontroll.html',
      controller: 'OutControllController as outCtrl',
      resolve: {
        container: ['DataService', function (DataService) {
          return DataService.getContainer();
        }]
      }
    })
    .state('public.package', {
      url: '/package',
      templateUrl: 'public/package/package.html',
      controller: 'PackageController as pckCtrl'
    })
    .state('public.pdf', {
      url: '/pdf',
      templateUrl: 'public/pdf/pdf.html',
      controller: 'PDFController as pdfCtrl'
    })
    .state('public.edit', {
      url: '/edit',
      templateUrl: 'public/edit/edit.html',
      controller: 'EditController as edCtrl'
    })
    .state('public.report', {
      url: '/report',
      templateUrl: 'public/report/report.html',
      controller: 'ReportController as repCtrl',
      resolve: {
        items: ['DataService', function (DataService) {
          return DataService.getItemsToReport();
        }]
      }
    }).state('public.agent', {
      url: '/agent',
      templateUrl: 'public/agent/agent.html',
      controller: 'AgentController as agCtrl',
      resolve: {
        agents: ['DataService', function (DataService) {
          return DataService.getAgents();
        }]
      }
    }).state('public.agent.details', {
      templateUrl: 'public/agent/deck-details.html',
      controller: 'DeckController as deckCtrl',
      params: {
        deck: null
      }
    }).state('public.assembly', {
      url: '/assembly',
      templateUrl: 'public/assembly/assembly.html',
      controller: 'AssemblyController as asCtrl',
      params: {
        elementData: {
          banch: null,
          id: null,
          agentWgt: null,
          status: null
        },
        agentData: {
          isEmpty: null,
          weight: null,
          deck: null,
          id : null
        }
      }
    }).state('public.assembly.claddings', {
      url: '/claddings',
      templateUrl: 'public/assembly/claddings.html',
      controller: 'CladdingsController as cladCtrl',
      resolve: {
        items: ['DataService', '$stateParams', function(DataService, $stateParams) {
          return DataService.getBanchItems($stateParams.elementData.banch);
        }]
      }
    }).state('public.assembly.agents', {
      url: '/agents',
      templateUrl: 'public/assembly/agents.html',
      controller: 'AssemblyAgentsController as asagCtrl',
      resolve: {
        agents: ['DataService', '$stateParams', function(DataService, $stateParams) {
          return DataService.getDeckAgents($stateParams.agentData.deck);
        }]
      }
    });
  }

})();
