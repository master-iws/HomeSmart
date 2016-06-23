'use strict';

app.controller('StatisticController',["$scope", "$rootScope", "$state",	function($scope, $rootScope, $state) {
	
	
	$scope.period;
	
	$scope.periodBack() = function() {
    	if($scope.period.typ == 'year')
    		$scope.period.startDate = $scope.period.startDate.subtract(1, 'years');
    	else if($scope.period.typ == 'month')
    		$scope.period.startDate = $scope.period.startDate.subtract(1, 'months');
    	else if($scope.period.typ == 'week')
    		$scope.period.startDate = $scope.period.startDate.subtract(7, 'days');
    	else if($scope.period.typ == 'day')
    		$scope.period.startDate = $scope.period.startDate.subtract(1, 'days');
    	
    	//$scope.loadChartData();
    };

    $scope.periodForward() = function() {
    	if($scope.period.typ == 'year')
    		$scope.period.startDate = $scope.period.startDate.add(1, 'years');
    	else if($scope.period.typ == 'month')
    		$scope.period.startDate = $scope.period.startDate.add(1, 'months');
    	else if($scope.period.typ == 'week')
    		$scope.period.startDate = $scope.period.startDate.add(7, 'days');
    	else if($scope.period.typ == 'day')
    		$scope.period.startDate = $scope.period.startDate.add(1, 'days');
    	
    	//$scope.loadChartData();
    };
    
    $scope.periodNow() = function() {
    	if($scope.period.typ == 'year')
    		$scope.period.startDate = moment().startOf('year');
    	else if($scope.period.typ == 'month')
    		$scope.period.startDate = moment().startOf('month');
    	else if($scope.period.typ == 'week')
    		$scope.period.startDate = moment().startOf('year');
    	else if($scope.period.typ == 'day')
    		$scope.period.startDate = moment().startOf('day');
    	
    	//$scope.loadChartData();
    };
    
    $scope.drillUpClick = function(){
		//drill up
		$scope.periodTypeHistory.pop();
		var lastPeriodType = $scope.periodTypeHistory.pop();
		
		$scope.setPeriodType(lastPeriodType.type, lastPeriodType.startDate, lastPeriodType.endDate);
	};
    
    $scope.onClick = function(d, i){
		//drill down
		var pt = $scope.period.type;
			
			if(pt === 'year') {
				$scope.period.type = 'month';
				$scope.period.startDate= moment(d.raw.date);
			} else if (pt === 'month') {
				$scope.period.type = 'day';
				$scope.period.startDate= moment(d.raw.date);
			}
	};
	
	$scope.loadChartData = function()
	{
		//room.getEnergyData()
		//response.label -> räume
		//response.dataset
		
		for (var i = 0; i < response.dataset.length; i++) {
			var newSeries = Object.create(seriesTemplate); 
			newSeries.unit = respDB[i].data.unit;
			newSeries.y = "value_" + i;
			newSeries.id = "series_" + i;
			newSeries.type ="line";
			newSeries.color = $scope.getSeriesColor(i);
			newSeries.label = getLabel(response.label[i]);
			
									
			series.push(newSeries);
			//statistics.push({unit: respDB[i].data.unit, data: respDB[i].data.statistic});
		}
		
		$scope.chartData = data;
		//$scope.statistic = statistics;
		
		var newChartOptions = Object.create(chartOptionsTemplate); 
		
		newChartOptions.axes.x = chartOptionsXAxesDate;
					
		newChartOptions.series = series;
		
		$scope.chartOptions = newChartOptions;
	}
    
    //konvertieren der geladenen daten bei load chartdata
			
	 $scope.data = {
		      dataset: [
		        {x: new Date("2016-02-02"), y: 0, other_y: 0, val_2: 0, val_3: 0},
		        {x:  new Date("2016-02-03"), y: 0.993, other_y: 3.894, val_2: 8.47, val_3: 14.347},
		        {x:  new Date("2016-02-04"), y: 1.947, other_y: 7.174, val_2: 13.981, val_3: 19.991},
		        {x:  new Date("2016-02-05"), y: 2.823, other_y: 9.32, val_2: 14.608, val_3: 13.509},
		        {x:  new Date("2016-02-06"), y: 3.587, other_y: 9.996, val_2: 10.132, val_3: -1.167},
		        {x:  new Date("2016-02-07"), y: 4.207, other_y: 9.093, val_2: 2.117, val_3: -15.136},
		        {x:  new Date("2016-02-08"), y: 4.66, other_y: 6.755, val_2: -6.638, val_3: -19.923},
		        {x:  new Date("2016-02-09"), y: 4.927, other_y: 3.35, val_2: -13.074, val_3: -12.625},
		        {x:  new Date("2016-02-10"), y: 4.998, other_y: -0.584, val_2: -14.942, val_3: 2.331},
		        {x:  new Date("2016-02-11"), y: 4.869, other_y: -4.425, val_2: -11.591, val_3: 15.873},
		        {x:  new Date("2016-02-12"), y: 4.546, other_y: -7.568, val_2: -4.191, val_3: 19.787},
		        {x:  new Date("2016-02-13"), y: 4.042, other_y: -9.516, val_2: 4.673, val_3: 11.698},
		        {x:  new Date("2016-02-14"), y: 3.377, other_y: -9.962, val_2: 11.905, val_3: -3.487},
		        {x:  new Date("2016-02-15"), y: 2.578, other_y: -8.835, val_2: 14.978, val_3: -16.557}
		       ]
		     };

		    $scope.options = {
		      axes: {
		        x: {
		          key: "x",
		          type: "date",
	              labelFunction: function(d) {console.log(d); return d3.time.format("%Y-%m-%d").parse(d); }
		        }
		      },
		      tooltipHook: function(d){
		        return {
		          abscissas: "Foo",
		          rows:  d.map(function(s){
		            return {
		              label: "My label: " + s.series.label,
		              value: s.row.y1,
		              color: s.series.color,
		              id: s.series.id  
		            }
		          })
		        }
		      },
		      series: [
		        {
		          dataset: "dataset", 
		          key: 'val_2', 
		          label: 'One', 
		          type: ['line', 'dot', 'line', 'area'],
		          color: "rgb(126, 181, 63)",
		          interpolation: {mode: 'cardinal', tension: 0.7}
		        },
		        {
		          dataset: "dataset",
		          key: 'y',
		          type: ['line', 'dot', 'area'],
		          label: 'Two',
		          color: "rgb(200, 96, 69)",
		          interpolation: {mode: 'cardinal', tension: 0.7}
		        },
		        {
		          dataset: "dataset",
		          key: 'other_y',
		          type: ['line', 'dot', 'area'],
		          label: 'Three',
		          color: "rgb(119, 48, 131)",
		          interpolation: {mode: 'cardinal', tension: 0.7}
		        }
		      ]};
}]);