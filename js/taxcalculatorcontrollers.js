'use strict';

function TaxCalculatorCtrl($scope, $http) {
  $scope.showTaxComputation = false;
  
  $scope.nnrate = 0.00;
  $scope.nytdtax1 = 0.00;
  $scope.nytdtax3 = 0.00;
  $scope.nytddeduct = 0.00;
  $scope.nytdwtax = 0.00;
  $scope.ncurrtax1 = 0.00;
  $scope.ncurrtax2 = 0.00;
  $scope.ncurrtax3 = 0.00;
  $scope.ncurrdeduct = 0.00;
  $scope.nrempayperiod = 11.00;
  
  $scope.ntaxbonus = 30000.00;

  if (($scope.nytdtax3 + $scope.ncurrtax3) > $scope.ntaxbonus) {
    $scope.vartotaltaxinc3 = ($scope.nytdtax3 + $scope.ncurrtax3) - $scope.ntaxbonus;
  }
  else {
    $scope.vartotaltaxinc3 = 0;
  };

  /*
  For Basic Pay Computation
  */
  $scope.varTaxInc = ($scope.nytdtax1 + $scope.ncurrtax1);
  $scope.varrempayperiod = $scope.nrempayperiod;
  $scope.varnrate = 0.00;
  $scope.varProj = $scope.varnrate * $scope.varrempayperiod;
  $scope.varDeduct = $scope.nytddeduct + $scope.ncurrdeduct;
  $scope.varTotalInc = $scope.varTaxInc + $scope.varProj - $scope.varDeduct;
  $scope.varExempt = 50000.00;
  $scope.varTotalIncome = 0.00;

  if ($scope.varTotalInc > $scope.varExempt) {
    $scope.varTotalIncome = $scope.varTotalInc - $scope.varExempt;
  }
  else {
    $scope.varTotalIncome = 0;
  }
  
  $scope.varTaxBracket = 0.00;
  $scope.varTaxRate = 0.00;
  $scope.varTaxBase = 0.00;
  $scope.varExcessTax = $scope.varTotalIncome - $scope.varTaxBracket;
  $scope.varTotalTax = ($scope.varExcessTax * $scope.varTaxRate) + $scope.varTaxBase;

  /*
  For Basic Pay + Income2xx Computation
  */
  $scope.varTaxInc2 = ($scope.nytdtax1 + $scope.ncurrtax1 + $scope.ncurrtax2);
  $scope.varTotalInc2 = $scope.varTaxInc2 + $scope.varProj2 - $scope.varDeduct
  $scope.varTotalIncome2 = 0.00;

  if ($scope.varTotalInc2 > $scope.varExempt) {
    $scope.varTotalIncome2 = $scope.varTotalInc2 - $scope.varExempt
  }
  else {
    $scope.varTotalIncome2 = 0
  };


  $scope.varTaxBracket2 = 0.00;
  $scope.varTaxRate2 = 0.00;
  $scope.varTaxBase2 = 0.00;
  $scope.varExcessTax2 = $scope.varTotalIncome2 - $scope.varTaxBracket2;
  $scope.varTotalTax2 = ($scope.varExcessTax2 * $scope.varTaxRate2) + $scope.varTaxBase2;

  $scope.varwtax = 0;

  $scope.selected = {};
  $scope.dictpayfreq = [
    {
      "id": "0",
      "payfreq": "Monthly",
      "divisor": "1"
    },
    {
      "id": "1",
      "payfreq": "Semi-Monthly",
      "divisor": "2"
    }
  ];

  $scope.dicttaxstatus = [
    {
      "id": "0",
      "taxstatus": "Z",
      "taxbonus": 0
    },
    {
      "id": "1",
      "taxstatus": "S / ME",
      "taxbonus": 30000
    },
    {
      "id": "2",
      "taxstatus": "ME1 / S1",
      "taxbonus": 30000
    },
    {
      "id": "3",
      "taxstatus": "ME2 / S2",
      "taxbonus": 30000
    },
    {
      "id": "4",
      "taxstatus": "ME3 / S3",
      "taxbonus": 30000
    },
    {
      "id": "5",
      "taxstatus": "ME4 / S4",
      "taxbonus": 30000
    },
  ];

  $scope.dicttaxtable = [
    {
      "id": "0",
      "lBound": 0,
      "uBound": 10000,
      "rate": 0.05,
      "bTax": 0
    },
    {
      "id": "1",
      "lBound": 10000,
      "uBound": 30000,
      "rate": 0.10,
      "bTax": 500
    },
    {
      "id": "2",
      "lBound": 30000,
      "uBound": 70000,
      "rate": 0.15,
      "bTax": 2500
    },
    {
      "id": "3",
      "lBound": 70000,
      "uBound": 140000,
      "rate": 0.20,
      "bTax": 8500
    },
    {
      "id": "4",
      "lBound": 140000,
      "uBound": 250000,
      "rate": 0.25,
      "bTax": 22500
    },
    {
      "id": "5",
      "lBound": 250000,
      "uBound": 500000,
      "rate": 0.30,
      "bTax": 50000
    },
    {
      "id": "6",
      "lBound": 500000,
      "uBound": 99999999999999,
      "rate": 0.32,
      "bTax": 125000
    }
  ];

  $scope.selected = {
    payfreq: $scope.dictpayfreq[0],
    taxstatus: $scope.dicttaxstatus[1]
  };

  $scope.$watch('nnrate', function () {
    computeTax();
  });

  $scope.$watch('selected.payfreq', function () {
    computeTax();
  });

  $scope.$watch('selected.taxstatus', function () {
    computeTax();
  });

  $scope.$watch('nrempayperiod', function () {
    computeTax();
  });

  $scope.$watch('nytdtax1', function () {
    computeTax();
  });

  $scope.$watch('nytdtax3', function () {
    computeTax();
  });

  $scope.$watch('nytddeduct', function () {
    computeTax();
  });

  $scope.$watch('nytdwtax', function () {
    computeTax();
  });

  $scope.$watch('ncurrtax1', function () {
    computeTax();
  });

  $scope.$watch('ncurrtax2', function () {
    computeTax();
  });

  $scope.$watch('ncurrtax3', function () {
    computeTax();
  });

  $scope.$watch('ncurrdeduct', function () {
    computeTax();
  });

  function computeTax() {
    $scope.varnrate = $scope.nnrate / $scope.selected.payfreq.divisor;
    $scope.ntaxbonus = $scope.selected.taxstatus.taxbonus;
    
    if (($scope.nytdtax3 + $scope.ncurrtax3) > $scope.ntaxbonus) {
      $scope.vartotaltaxinc3 = ($scope.nytdtax3 + $scope.ncurrtax3) - $scope.ntaxbonus;
    }
    else {
      $scope.vartotaltaxinc3 = 0;
    };
    
    $scope.varrempayperiod = $scope.nrempayperiod;
    $scope.varProj = $scope.varnrate * $scope.varrempayperiod;
    $scope.varDeduct = $scope.nytddeduct + $scope.ncurrdeduct;
    $scope.varExempt = 50000.00;
    
    $scope.varTaxInc = ($scope.nytdtax1 + $scope.ncurrtax1);
    $scope.varTotalInc = $scope.varTaxInc + $scope.varProj - $scope.varDeduct
    
    if ($scope.varTotalInc > $scope.varExempt) {
      $scope.varTotalIncome = $scope.varTotalInc - $scope.varExempt
    }
    else {
      $scope.varTotalIncome = 0
    };

    $scope.varTaxBracket = 0.00;
    $scope.varTaxRate = 0.00;
    $scope.varTaxBase = 0.00;
    
    for (var i = 0; i < $scope.dicttaxtable.length; i++) {
      if ($scope.varTotalIncome >= $scope.dicttaxtable[i].lBound && $scope.varTotalIncome < $scope.dicttaxtable[i].uBound) {
        $scope.varTaxBracket = $scope.dicttaxtable[i].lBound;
        $scope.varTaxRate = $scope.dicttaxtable[i].rate;
        $scope.varTaxBase = $scope.dicttaxtable[i].bTax;
      }
    };
    
    $scope.varExcessTax = $scope.varTotalIncome - $scope.varTaxBracket;
    $scope.varTotalTax = ($scope.varExcessTax * $scope.varTaxRate) + $scope.varTaxBase;
    
    /*
    With Income 200x
    */
    
    $scope.varTaxInc2 = ($scope.nytdtax1 + $scope.ncurrtax1 + $scope.ncurrtax2);
    $scope.varTotalInc2 = $scope.varTaxInc2 + $scope.varProj - $scope.varDeduct

    if ($scope.varTotalInc2 > $scope.varExempt) {
      $scope.varTotalIncome2 = $scope.varTotalInc2 - $scope.varExempt
    }
    else {
      $scope.varTotalIncome2 = 0
    };
    
    $scope.varTaxBracket2 = 0.00;
    $scope.varTaxRate2 = 0.00;
    $scope.varTaxBase2 = 0.00;
    
    for (var i = 0; i < $scope.dicttaxtable.length; i++) {
      if ($scope.varTotalIncome2 >= $scope.dicttaxtable[i].lBound && $scope.varTotalIncome2 < $scope.dicttaxtable[i].uBound) {
        $scope.varTaxBracket2 = $scope.dicttaxtable[i].lBound;
        $scope.varTaxRate2 = $scope.dicttaxtable[i].rate;
        $scope.varTaxBase2 = $scope.dicttaxtable[i].bTax;
      }
    };

    $scope.varExcessTax2 = $scope.varTotalIncome2 - $scope.varTaxBracket2;
    $scope.varTotalTax2 = ($scope.varExcessTax2 * $scope.varTaxRate2) + $scope.varTaxBase2;

    /*
    WTAX
    */

    $scope.varwtax = ((($scope.ncurrtax1 - $scope.ncurrdeduct) / ($scope.ncurrtax1 - $scope.ncurrdeduct + $scope.varProj)) * ($scope.varTotalTax - $scope.nytdwtax)) + ($scope.varTotalTax2 - $scope.varTotalTax);
  };
  
  $scope.showTaxAllocation = function (totalTax){
    $http.get('json/GESFB8js.jsx').success(function(data,status){
      $scope.baseAllocation = data.data;
      var xdata = data.data;        
    }).error(function(data,status){
      $scope.baseAllocation = '';
    });
    
    $scope.$watch(totalTax, function () {
      var actualAllocation = computeAllocation(totalTax, $scope.baseAllocation);
      loadMainChart(actualAllocation, totalTax, $scope.baseAllocation);
    });
  }
}

