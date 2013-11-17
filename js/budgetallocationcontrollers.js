var SpecificSectorOptions = {
    chart: {
	  type: 'pie',
	  renderTo: 'SpecificSectorAllocationchart',
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false
    },
    title: {
      text: 'BUDGET ALLOCATION'
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

var SpecificSectorChart;

function BudgetAllocationCtrl($scope, $http){
  SpecificSectorChart = new Highcharts.Chart(SpecificSectorOptions);
  
  $http.get('json/GESFB8js.jsx').success(function(data,status){
    $scope.budgetAllocation = data.data;
    xdata = data.data;
    $scope.loadChart();
  }).error(function(data,status){
    $scope.baseAllocation = [];
  });

  $scope.loadChart = function (){
    $scope.chartData = [];
    angular.forEach($scope.budgetAllocation, function (value, key){
      $scope.chartData.push({
        name: value.sect,
        y: value.current_amt,
        id: value.sect
      });
    });
    SectorAllocationchart($scope.chartData,$scope.budgetAllocation);
  }
}



var SectorAllocationchart = function (chartData,  baseAllocation) {
  $('#SectorAllocationchart').highcharts({
    chart: {
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false
    },
    title: {
      text: '2013 Sectoral Budget Allocation'
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
            click: function (){showSpecificSectorDetail(this.id,baseAllocation);}
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
      name: 'Budget Allocation',
      data: chartData
    }]
  });
}


var showSpecificSectorDetail = function (sectorname,baseAllocation){
  var dtlAllocation = [];
  angular.forEach(baseAllocation, function (sector, key){	
    if (angular.equals(sector.sect,sectorname)){		
      if (angular.isArray(sector.dept)){		  
        angular.forEach(sector.dept, function (dept, key){
          amount = dept.current_amt;
          amount = parseFloat(amount.toFixed(2));
          dtlAllocation.push({
            name: dept.dept_name,
            y: amount,
            id: dept.dept_name
          });
        });        
      }      
      else {
		  amount = sector.current_amt ;
          amount = parseFloat(amount.toFixed(2));
          dtlAllocation.push({
            name: sector.sect,
            y: amount,
            id: sector.sect
          });
	  }      
      
	  SpecificSectorChart.addSeries(SpecificSectorOptions, false);
	  SpecificSectorChart.series[0].setData(dtlAllocation, false);	  	
	  SpecificSectorChart.redraw();
	  $('#SpecificSectorAllocationchart .highcharts-title').text(sectorname);
    }
  });
}


