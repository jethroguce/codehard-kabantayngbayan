var DtlOptions = {
    chart: {
	  type: 'pie',
	  renderTo: 'dtlchart',
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false
    },
    title: {
      text: 'THIS IS WHERE IT GOES'
    },
    tooltip: {
      pointFormat: '<b>{point.percentage:.1f}%</b>'
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        innerSize: 100,
        point:{
          
        },
        dataLabels: {
          enabled: true,
          color: '#000000',
          connectorColor: '#000000',
          format: '<b>{point.name}</b>: Php. {y} '
        }                    
      }
    },
    legend: {
		  enabled: false
	  },
    series: []
  }

var DtlChart;

function TaxAllocationCtrl($scope, $http){
  $scope.TotalTax = 20000;
    
  DtlChart = new Highcharts.Chart(DtlOptions);
  
  $http.get('json/GESFB8js.jsx').success(function(data,status){
    $scope.baseAllocation = data.data;
    xdata = data.data;
    $scope.showAllocation();
  }).error(function(data,status){
    $scope.baseAllocation = '';
  });
  
  $scope.showAllocation = function(){
    actualAllocation = computeAllocation($scope.TotalTax,$scope.baseAllocation);
    loadMainChart(actualAllocation,$scope.TotalTax,$scope.baseAllocation);
  }
  
  $scope.$watch('TotalTax', function () {
    $scope.showAllocation();
  });  
  
}

var computeAllocation = function (totalTax,baseAllocation) {
  var actualAllocation = [];
  angular.forEach(baseAllocation, function (sector, key){
    amount = (sector.current_percentage/100) * totalTax;
    amount = parseFloat(amount.toFixed(2));
    actualAllocation.push({
      name: sector.sect,
      y: amount,
      id: sector.sect
    });
  });  
  return actualAllocation;
}

var showDetail = function (sectorname,totalTax, baseAllocation){
  var dtlAllocation = [];
  angular.forEach(baseAllocation, function (sector, key){
    if (angular.equals(sector.sect,sectorname)){
      if (angular.isArray(sector.dept)){
        angular.forEach(sector.dept, function (dept, key){
          amount = (dept.current_percentage/100) * totalTax ;
          amount = parseFloat(amount.toFixed(2));
          dtlAllocation.push({
            name: dept.dept_name,
            y: amount,
            id: dept.dept_name
          });
        });        
      }      
      else {
		  amount = (sector.current_percentage/100) * totalTax ;
          amount = parseFloat(amount.toFixed(2));
          dtlAllocation.push({
            name: sector.sect,
            y: amount,
            id: sector.sect
          });
	  }    
      
      
      
	  if (angular.isArray(DtlOptions.series)){
		  setTimeout("DtlOptions.series[0].remove(false)", 1000);
		  DtlChart.addSeries(DtlOptions, false);
		  DtlChart.series[0].setData(dtlAllocation, false);
	  }	
	  DtlChart.redraw();
	  $('#dtlchart .highcharts-title').text(sector.sect);
    }
  });
}

var loadMainChart = function (actualAllocation, totalTax, baseAllocation) {
  $('#mainchart').highcharts({
    chart: {
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false
    },
    title: {
      text: 'THIS IS WHERE IT GOES'
    },
    tooltip: {
      pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        innerSize: 0,
        point:{
          events: { 
            click: function (){showDetail(this.id,totalTax,baseAllocation);}
          }
        },
        dataLabels: {
          enabled: true,
          color: '#000000',
          connectorColor: '#000000',
          format: '<b>{point.name}</b>: Php. {y} '
        }
      }
    },
    legend: {
      enabled: false
    },
    series: [{
      type: 'pie',
      name: 'Tax Allocation',
      data: actualAllocation
    }]
  });
}
