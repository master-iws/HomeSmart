'use strict';
/**
 * @author Julia Thüroff
 */
app.controller('PVController',["$scope", "$rootScope", "$state","MainService",	
                               function($scope, $rootScope, $state,mainService) {
	
	var d3_locale_deDE = d3.locale({
		  decimal: ",",
		  thousands: ".",
		  grouping: [3],
		  currency: ["", " €"],
		  dateTime: "%A, der %e. %B %Y, %X",
		  date: "%d.%m.%Y",
		  time: "%H:%M:%S",
		  periods: ["AM", "PM"], // unused
		  days: ["Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag"],
		  shortDays: ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"],
		  months: ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"],
		  shortMonths: ["Jan", "Feb", "Mrz", "Apr", "Mai", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dez"]
		});
	
	$scope.period = {};
	$scope.period.typ = "month";
	$scope.period.startDate = moment().startOf('month');
	
	$scope.roomId = -1;
	
	
	$scope.periodBack = function() {
    	if($scope.period.typ === 'year'){
    		$scope.period.startDate = $scope.period.startDate.subtract(1, 'years').startOf('year');
    	}else if($scope.period.typ == 'month'){
    		$scope.period.startDate = $scope.period.startDate.subtract(1, 'months');
    	}else if($scope.period.typ == 'day'){
    		$scope.period.startDate = $scope.period.startDate.subtract(1, 'days');
    	}
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
        	$scope.period.startDate.minute(0);
        }
		
		$scope.period.typ = newPeriodTypeString;
        $scope.loadChartData();
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
    
	
	
	$scope.loadChartData = function()
	{
		if($scope.period.typ === "year")
			$scope.unit = "kWh";
		else if($scope.period.typ === "month")
			$scope.unit = "kWh";
		else 
			$scope.unit = "Wh";
		
		var date = moment();
		date.year($scope.period.startDate.year());
		date.month($scope.period.startDate.month());
		date.date($scope.period.startDate.date());
		date.hour($scope.period.startDate.hour());
		var response = $rootScope.houses[$rootScope.houseIndex].getPvData($scope.period.typ,date);
		
		var series = [];
		
		for (var i = 0; i <  response.label.length; i++) {
			var newSeries = Object.create(seriesTemplate); 
			newSeries.key = "series_" + i;
			newSeries.dataset = "dataset";
			newSeries.unit = $scope.unit;
		    //newSeries.interpolation= {mode: "bundle", tension: 1};
			newSeries.labelFunction = function (v) {console.log("Label");
				var unit = $scope.chartOptions.series[0].unit;
				return v + " " + unit;
				};
			newSeries.type =["dot","line"];
			newSeries.color = $scope.getSeriesColor(i);
			newSeries.label = response.label[i];
			series.push(newSeries);
		}
		var newChartOptions = {}; 
		newChartOptions.axes = {};
		
		newChartOptions.tooltipHook= function(d){
	        return {
	          abscissas: d[0].row.x,
	          rows:  d.map(function(s){
	            return {
	              label: s.series.label,
	              value: s.row.y1+" "+$scope.unit,
	              color: s.series.color,
	              id: s.series.id  
	            }
	          })
	        }
	      },
		
		newChartOptions.tooltip= {};
		newChartOptions.tooltip.mode= "scrubber";
		newChartOptions.axes.x = chartOptionsXAxesDate;
		newChartOptions.axes.y = {};
		newChartOptions.axes.y.label = ""+$scope.unit;
		d3.time.format = d3_locale_deDE.timeFormat;
		
		if($scope.period.typ == "year")
			newChartOptions.axes.x.tickFormat = d3.time.format("%B");
		else if($scope.period.typ === "month")
			newChartOptions.axes.x.tickFormat = d3.time.format("%d.%m.%y");
		else if($scope.period.typ === "day")
			newChartOptions.axes.x.tickFormat = d3.time.format("%H:%M");
		newChartOptions.series = series;
		$scope.chartOptions = newChartOptions;
		$scope.chartData = {};
		$scope.chartData.dataset = response.dataset;
	}
	
	
	
	
	$scope.loadChartData();
	
	$scope.nextTab = function()
	{
		$state.go("water");
	};
	
	$scope.prevTab = function()
	{
		$state.go("activities");
	}
		
}]);