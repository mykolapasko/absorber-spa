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
          return DataService.getItemsToControll();
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
    .state('public.outcontroll', {
      url: '/outcontroll',
      templateUrl: 'public/outcontroll/outcontroll.html',
      controller: 'OutControllController as outCtrl'
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
    });

  }


})();
