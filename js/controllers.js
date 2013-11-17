'use strict';

function MainCtrl($scope, $route, $routeParams, $location){
  
}

function SidebarCtrl($scope, $location, $route, $routeParams){
  /*
  #1
  Where does my tax goes
  How much goes to sectors/agencies
  
  Calculate taxes based on income
  See budget allocations to agencies from taxes contributed
  Show amounts that specific agencies received based on releases
  Create customized list of release per sector
  
  
  #2
  Citizen's Do-It-Yourself National Budget
  
  Allow flters to enable citizens to visualize their own version of the national budget 
  Show comparative visual of actual budget & budget made by the citizen
  Create rankings of all submissions to tally which sectors have the most budget
  Provide function for social media sharing 
  
  
  #3
  Provide a feedback mechanism on budget allotment releases to agencies  
  
  Allow ratings on releases   
  Identify releases that have the most comments 
  Show agencies who received the budget releases 
  Provide function for social media sharing
  */
  
  $scope.sideBar = [
    {'name': 'Dashboard', 'icon': 'icon-home', 'templateUrl': 'partials/dashboard.html', 'routeUrl': '#/'},
    {'name': 'Tax Watch', 'icon': 'icon-eye-open', 'templateUrl': 'javascript:;', 'routeUrl': 'javascript:;', 'children': [
      {'name': 'Tax Calculator', 'templateUrl': 'partials/tax-calculator.html', 'routeUrl': '#/tax-calculator'},
      {'name': 'Tax Allocation', 'templateUrl': 'partials/tax-allocation.html', 'routeUrl': '#/tax-allocation'}
    ]},
    {'name': 'Budget Watch', 'icon': 'icon-money', 'templateUrl': 'partials/budget-watch.html', 'routeUrl': '#/budget-watch'},
    {'name': 'DIY National Budget', 'icon': 'icon-magic', 'templateUrl': 'javascript:;', 'routeUrl': 'javascript:;', 'children': [
      {'name': 'Propose Your Own Budget', 'templateUrl': 'partials/propose-your-own-budget.html', 'routeUrl': '#/propose-your-own-budget'}
    ]},
    {'name': 'About', 'icon': 'icon-info', 'templateUrl': 'partials/about.html', 'routeUrl': '#/about'}
  ];
  
  
  $scope.$route = $route;
  $scope.$location = $location;
  $scope.$routeParams = $routeParams;
  
  var locationPath = $location.path().split('/');
  
  if (locationPath.length > 1){
  
    $scope.contentTemplate = {
      'templateUrl': ''
    }
  }
  
  if ($routeParams.componentId){
    $scope.templateUrl = 'partials/' + $routeParams.componentId + '.html';
  }
  
  $scope.setContent = function (component){
    if (component){
      if (component.templateUrl != 'javascript:;'){
        $scope.contentTemplate = component;
      }
    }
  }
  
  $scope.setActive = function (index) {
    for (var i=0; $scope.uiComponents.length; i++) {
      if (i == index) {
        $scope.uiComponents[i].class = 'active'; 
      }
      else {
        $scope.uiComponents[i].class = ''; 
      }
    }
  }
  
  App.init();
}

function contentCtrl($scope, $http, $location, $route, $routeParams) {
  var location = $location.path();
  
  if (location == 'dashboard'){
    $scope.page = {'name': 'Dashboard', 'title': 'Everything at glance'};
  }
  else if (location == 'tax-calculator') {
    $scope.page = {'name': 'Tax Calculator', 'title': ''};
  }
}

function SampleCtrl($scope, $http) {
  var apiUrl = 'http://api.kabantayngbayan.ph/budget/';
  var apiAppId = '?app_id=52870b045e13db255f5dbd48';
  var params = '&type=new_appro&limit=1&skip=0';
  
  var url = apiUrl + apiAppId + params;
  
  $http.get(url)
  .success(function (data, status) {
    $scope.data = data;
    console.log(data);
  })
  .error(function (data, status) {
    console.log('error');
  });
  
}