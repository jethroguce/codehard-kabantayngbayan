'use strict';

var app = angular.module('KabantayNgBayan', ['ui.bootstrap']);

// Allow cross-domain
app.config(['$httpProvider', function($httpProvider) {
  delete $httpProvider.defaults.headers.common["X-Requested-With"];
}]);

app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
  $routeProvider.when('/', {
    templateUrl: 'partials/dashboard.html',
    controller: MainCtrl
  });
  $routeProvider.when('/tax-calculator', {
    templateUrl: 'partials/tax-calculator.html',
    controller: TaxCalculatorCtrl
  });
  $routeProvider.when('/tax-allocation', {
    templateUrl: 'partials/tax-allocation.html',
    controller: TaxAllocationCtrl
  });
  $routeProvider.when('/customize-list-of-release', {
    templateUrl: 'partials/customize-list-of-release.html',
    controller: MainCtrl
  });
  $routeProvider.when('/budget-watch', {
    templateUrl: 'partials/budget-watch.html',
    controller: BudgetWatchCtrl
  });
  $routeProvider.when('/propose-your-own-budget', {
    templateUrl: 'partials/propose-your-own-budget.html',
    controller: ProposeBudgetCtrl
  });
  $routeProvider.when('/sample', {
    templateUrl: 'partials/sample.html',
    controller: SampleCtrl
  });
  $routeProvider.when('/about', {
    templateUrl: 'partials/about.html'
  });
  $routeProvider.otherwise({redirectTo: '/'});
}]);