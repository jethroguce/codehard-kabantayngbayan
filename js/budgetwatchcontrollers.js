'use strict';

function BudgetWatchCtrl($scope, $http, $filter){
  $scope.display = {
    'showSelectMsg': false,
    'showSelectedSector': false,
  }
  
  $scope.sectorList = {};
  $scope.deptList = {};
  
  $http.get('json/GESFB8js.jsx').success(function(data,status){
    $scope.sectorList = data.data;
  }).error(function(data,status){
    $scope.sectorList = {};
  });
  
  
  $scope.showBudgetAllocation = function (sector){
    if (sector == undefined || sector == ''){
      $scope.display.showSelectMsg = true;
      $scope.display.showSelectedSector = false;
    }
    else {
      $scope.display.showSelectMsg = false;
      $scope.display.showSelectedSector = true;
      
      $scope.selectedSector = sector;
      $scope.sectorX = $filter('filter')($scope.sectorList, {'sect': sector});
      $scope.deptList = $scope.sectorX[0].dept;
      
      console.log($scope.deptList);
    }
  }
}