'use strict';

app.controller('StatisticController',["$scope", "$rootScope", "$state",	function($scope, $rootScope, $state) {
	
	$scope.period = {};
	$scope.period.typ = "year";
	$scope.period.startDate = moment().startOf('year');
	
	$scope.showChart = false;
	
	$scope.start =  moment().subtract(7,'hour');
	
	$scope.lastActivitys = [];
	$scope.names = ['Anna','Max','Robert','Katrin'];
	$scope.doorType =['betreten','verlassen'];
	
	for(var i=0; i < 4; i++)
	{
		var activity = {};
		activity.ts = ($scope.start.add(1,'hour')).format('DD.MM.YYYY HH:mm.ss');
		activity.text = $scope.names[i] +" hat das Haus "+$scope.doorType[i%2]+".";
		$scope.lastActivitys.push(activity);
	}
	
	$scope.lastActivity =$scope.start.format('DD.MM.YYYY HH:mm.ss');
	
	$scope.periodBack = function() {
    	if($scope.period.typ === 'year'){
    		$scope.period.startDate = $scope.period.startDate.subtract(1, 'years').startOf('year');
    	}else if($scope.period.typ == 'month'){
    		$scope.period.startDate = $scope.period.startDate.subtract(1, 'months');
    	}else if($scope.period.typ == 'day'){
    		$scope.period.startDate = $scope.period.startDate.subtract(1, 'days');
    	}
    	console.log($scope.period.startDate);
    	$scope.loadChartData();
    };

    $scope.periodForward = function() {
    	if($scope.period.typ == 'year')
    		$scope.period.startDate = $scope.period.startDate.add(1, 'years').startOf('year');
    	else if($scope.period.typ == 'month')
    		$scope.period.startDate = $scope.period.startDate.add(1, 'months');
    	else if($scope.period.typ == 'day')
    		$scope.period.startDate = $scope.period.startDate.add(1, 'days');
    	
    	$scope.loadChartData();
    };
    
    $scope.periodNow = function() {
    	if($scope.period.typ == 'year')
    		$scope.period.startDate = moment().startOf('year');
    	else if($scope.period.typ == 'month')
    		$scope.period.startDate = moment().startOf('month');
    	else if($scope.period.typ == 'week')
    		$scope.period.startDate = moment().startOf('year');
    	else if($scope.period.typ == 'day')
    		$scope.period.startDate = moment().startOf('day');
    	
    	$scope.loadChartData();
    };
    
    $scope.setPeriodType = function (newPeriodTypeString) {
    	console.log($scope.period.startDate);
		if(newPeriodTypeString === 'year'){
			$scope.period.startDate.startOf('year');
        } else if (newPeriodTypeString === 'month'){
        	$scope.period.startDate.startOf('month');
        } else if (newPeriodTypeString === 'day'){
        	$scope.period.startDate.hour(0);
        }
		
		$scope.period.typ = newPeriodTypeString;
		console.log($scope.period.startDate);
        $scope.loadChartData();
	};
	
    
    $scope.drillUpClick = function(){
		//drill up
		$scope.periodTypeHistory.pop();
		var lastPeriodType = $scope.periodTypeHistory.pop();
		
		$scope.setPeriodType(lastPeriodType.type, lastPeriodType.startDate, lastPeriodType.endDate);
	};
    
    $scope.onClick = function(d, i){
		//drill down
    	console.log(d);
		/*var pt = $scope.period.type;
			
			if(pt === 'year') {
				$scope.period.type = 'month';
				$scope.period.startDate= moment(d.raw.date);
			} else if (pt === 'month') {
				$scope.period.type = 'day';
				$scope.period.startDate= moment(d.raw.date);
			}*/
	};
	
	
	var seriesTemplate = {
            type: "column",
            color: "#0000FF",
            axis: "y",
			id: "series_1",
			label: "xxx",
			drawDots: true
        };
	
	$scope.color = ['#314DFF', '#36E24E', '#DB2118', '#FF67E3', '#FF9329','#EBEBEB','#000000'];

	$scope.getSeriesColor = function(i) {
		var idx = i - (parseInt(i / $scope.color.length) *  $scope.color.length);
		
		return $scope.color[idx];
	};
	
	var chartOptionsXAxesDate = {type: "date", key: "x", ticksRotate: 90};
    
	$scope.options = {
		      axes: {
		        x: {
		          key: "x",
		          type: "date",
	              labelFunction: function(d) {return d3.time.format("%Y-%m-%d").parse(d); }
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
		          key: 'series_0', 
		          label: 'One', 
		          type: ['line', 'dot', 'line', 'area'],
		          color: "rgb(126, 181, 63)",
		          interpolation: {mode: 'cardinal', tension: 0.7}
		        }
		      ]};
	
	
	$scope.loadChartData = function()
	{
		$scope.showChart = true;
		var date = moment();
		date.year($scope.period.startDate.year());
		date.month($scope.period.startDate.month());
		date.date($scope.period.startDate.date());
		date.hour($scope.period.startDate.hour());
		var response = $rootScope.houses[$rootScope.houseIndex].getEnergyData($scope.period.typ,date);
		console.log(response);
		console.log("loadchartdata");
		
		var series = [];
		
		for (var i = 0; i <  response.label.length; i++) {
			var newSeries = Object.create(seriesTemplate); 
			newSeries.key = "series_" + i;
			newSeries.dataset = "dataset";
			newSeries.type ="line";
			newSeries.color = $scope.getSeriesColor(i);
			newSeries.label = response.label[i];
			
			series.push(newSeries);
		}
		
		var newChartOptions = {}; 
		newChartOptions.axes = {};
		newChartOptions.tooltip= {};
		newChartOptions.tooltip.mode= "scrubber";
		newChartOptions.axes.x = chartOptionsXAxesDate;
		//newChartOptions.axes.x.labelFunction = function(d) {console.log(d); return d.format('MMMM Do YYYY');};
					
		newChartOptions.series = series;
		$scope.chartOptions = newChartOptions;
		
		$scope.chartData = {};
		$scope.chartData.dataset = response.dataset;
	}
	
	$scope.loadWaterChartData = function()
	{
		$scope.showChart = true;
		var date = moment();
		date.year($scope.period.startDate.year());
		date.month($scope.period.startDate.month());
		date.date($scope.period.startDate.date());
		date.hour($scope.period.startDate.hour());
		var response = $rootScope.houses[$rootScope.houseIndex].getWaterData($scope.period.typ,date);
		console.log(response);
		
		var series = [];
		
		for (var i = 0; i <  response.label.length; i++) {
			var newSeries = Object.create(seriesTemplate); 
			newSeries.key = "series_" + i;
			newSeries.dataset = "dataset";
			newSeries.type ="line";
			newSeries.color = $scope.getSeriesColor(i);
			newSeries.label = response.label[i];
			
			series.push(newSeries);
		}
		
		var newChartOptions = {}; 
		newChartOptions.axes = {};
		newChartOptions.tooltip= {};
		newChartOptions.tooltip.mode= "scrubber";
		newChartOptions.axes.x = chartOptionsXAxesDate;
		//newChartOptions.axes.x.labelFunction = function(d) {console.log(d); return d.format('MMMM Do YYYY');};
					
		newChartOptions.series = series;
		$scope.chartOptions = newChartOptions;
		
		$scope.chartData = {};
		$scope.chartData.dataset = response.dataset;
	};
	
	$scope.loadRoomChartData = function(roomId)
	{
		$scope.showChart = true;
		var date = moment();
		date.year($scope.period.startDate.year());
		date.month($scope.period.startDate.month());
		date.date($scope.period.startDate.date());
		date.hour($scope.period.startDate.hour());
		var response = $rootScope.houses[$rootScope.houseIndex].getRooms()[roomId].getEnergyData($scope.period.typ,date);
		console.log(response);
		
		var series = [];
		
		for (var i = 0; i <  response.label.length; i++) {
			var newSeries = Object.create(seriesTemplate); 
			newSeries.key = "series_" + i;
			newSeries.dataset = "dataset";
			newSeries.type ="line";
			newSeries.color = $scope.getSeriesColor(i);
			newSeries.label = response.label[i];
			
			series.push(newSeries);
		}
		
		var newChartOptions = {}; 
		newChartOptions.axes = {};
		newChartOptions.tooltip= {};
		newChartOptions.tooltip.mode= "scrubber";
		newChartOptions.axes.x = chartOptionsXAxesDate;
		//newChartOptions.axes.x.labelFunction = function(d) {console.log(d); return d.format('MMMM Do YYYY');};
					
		newChartOptions.series = series;
		$scope.chartOptions = newChartOptions;
		$scope.chartData = {};
		$scope.chartData.dataset = response.dataset;
	};
	
	$scope.loadRoomWaterChartData = function(roomId)
	{
		$scope.showChart = true;
		var date = moment();
		date.year($scope.period.startDate.year());
		date.month($scope.period.startDate.month());
		date.date($scope.period.startDate.date());
		date.hour($scope.period.startDate.hour());
		var response = $rootScope.houses[$rootScope.houseIndex].getRooms()[roomId].getWaterData($scope.period.typ,date);
		console.log(response);
		
		var series = [];
		
		for (var i = 0; i <  response.label.length; i++) {
			var newSeries = Object.create(seriesTemplate); 
			newSeries.key = "series_" + i;
			newSeries.dataset = "dataset";
			newSeries.type ="line";
			newSeries.color = $scope.getSeriesColor(i);
			newSeries.label = response.label[i];
			
			series.push(newSeries);
		}
		
		var newChartOptions = {}; 
		newChartOptions.axes = {};
		newChartOptions.tooltip= {};
		newChartOptions.tooltip.mode= "scrubber";
		newChartOptions.axes.x = chartOptionsXAxesDate;
		//newChartOptions.axes.x.labelFunction = function(d) {console.log(d); return d.format('MMMM Do YYYY');};
					
		newChartOptions.series = series;
		$scope.chartOptions = newChartOptions;
		$scope.chartData = {};
		$scope.chartData.dataset = response.dataset;
	};
	
	$scope.loadChartData();
	
    
		
}]);