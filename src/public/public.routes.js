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
      controller: 'NozzleController as nzCtrl',
      params: {
        banch: null,
        itemId: null
      }
    })
    .state('public.nozzle.items', {
      views: {
          "@": {
            templateUrl: 'public/nozzle/items.html',
            controller: 'NozzleItemsController as itCtrl',
            resolve: {
            items: ['DataService', '$stateParams', function(DataService, $stateParams) {
              return DataService.getItemsToNozzle($stateParams.banch);
            }]
          }
        }
      }
    })
    .state('public.nozzle.details', {
      views: {
        "@" : {
          templateUrl: 'public/nozzle/item-details.html',
          controller: 'DetailsController as nzdetCtrl',
          resolve: {
            item: ['DataService', '$stateParams', function(DataService, $stateParams) {
              return DataService.getItem($stateParams.itemId);
            }]
          }
        }
      }
    })
    .state('public.stamp', {
      url: '/stamp',
      templateUrl: 'public/stamp/stamp.html',
      controller: 'StampController as stCtrl',
      params: {
        banch: null,
        itemId: null
      }
    })
    .state('public.stamp.items', {
      views: {
        "@" : {
          templateUrl: 'public/stamp/items.html',
          controller: 'StampItemsController as itCtrl',
          resolve: {
            items: ['DataService', '$stateParams', function(DataService, $stateParams) {
              return DataService.getItemsToStamp($stateParams.banch);
            }]
          }
        }
      }
    })
    .state('public.stamp.details', {
      views: {
        "@" : {
          templateUrl: 'public/stamp/item-details.html',
          controller: 'DetailsController as detCtrl',
          resolve: {
            item: ['DataService', '$stateParams', function(DataService, $stateParams) {
              return DataService.getItem($stateParams.itemId);
            }]
          }
        }
      }
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

    })
    .state('public.outcontroll.items', {
      views: {
        "@" : {
          templateUrl: 'public/outcontroll/items.html',
          controller: 'OutControllItemsController as outCtrl',
          resolve: {
            items: ['DataService', '$stateParams', function(DataService, $stateParams) {
              return DataService.getItemsToOutControll($stateParams.banch);
            }],
            container: ['DataService', '$stateParams', function(DataService) {
              return DataService.getContainer();
            }]
          }
        }
      }
    })
    .state('public.outcontroll.details', {
      views: {
        "@" : {
          templateUrl: 'public/outcontroll/item-details.html',
          controller: 'DetailsController as detCtrl',
          resolve: {
            item: ['DataService', '$stateParams', function(DataService, $stateParams) {
              return DataService.getItem($stateParams.itemId);
            }]
          }
        }
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
    .state('public.checking', {
      views: {
        "@" : {
                templateUrl: 'public/check/authorization.html',
                controller: 'CheckController as checkCtrl'
        }
      }
    })
    .state('public.edit', {
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
    }).state('public.assembly.agent', {
      templateUrl: 'public/assembly/agent.html',
      controller: 'AssemblyAgentController as asagtCtrl',
      resolve: {
        agent: ['DataService', '$stateParams', function(DataService, $stateParams) {
          return DataService.getDeckAgent($stateParams.agentData.deck);
        }]
      }
    }).state('public.tip', {
      url: '/tip',
      templateUrl: 'public/tip/tip.html',
      controller: 'TipController as tipCtrl',
      resolve: {
        tips: ['DataService', function(DataService) {
          return DataService.getTips();
        }]
      }
    });
  }

})();
