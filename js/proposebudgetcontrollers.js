'use strict';

function ProposeBudgetCtrl($scope, $http){
  $scope.sectorList = {};
  
  $http.get('json/GESFB8js.jsx').success(function(data,status){
    $scope.sectorList = data.data;
  }).error(function(data,status){
    $scope.sectorList = {};
  });

}