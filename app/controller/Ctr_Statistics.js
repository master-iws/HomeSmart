'use strict';

app.controller('HousesSettingsController',["$scope", "$rootScope", "$state",	function($scope, $rootScope, $state) {
	
	if(loadprofile.vedaNr) {
		$scope.thisMenu = menuService.energyDataViewChartMenuVedaLink($routeParams, loadprofile.vedaNr);	
	} else {
		$scope.thisMenu = menuService.energyDataViewChartMenu($routeParams);			
	}
			
    $scope.$parent.currentModule = $scope.thisMenu;
    $scope.name = "energydataview";
    $scope.userSettings = userSettings;
    $scope.userPermissions = userPermissions;
    $scope.loadprofile = loadprofile;
    $scope.additionalLoadprofiles = [];
	$scope.type = 'consumption';
	$scope.loading = true;
	$scope.showLastYear = false;
	$scope.selectTypeVisible = false;
	
	$scope.periodTypeHistory = [];
	
	
	var xLabelFunction = function(time) {
		
		return $scope.dataDateFormat(time, $scope.dataDateFormatOmitYear);
	};
		
	var xLabelFunctionYear = function(idx) {
		function isInt(n) {
			   return n % 1 === 0;
		}
		
		if(isInt(idx) && idx > -1 && idx < 12) {
			var data = $scope.chartData[idx];
			if(data) {
				return xLabelFunction(data.date);
			}
		}
	};
	
	var xTooltipFunction = function(time) {
		return $scope.dataDateFormat(time, false);
	};
		
	var xTooltipFunctionYear = function(idx) {
		var data = $scope.chartData[idx];
		return xTooltipFunction(data.date);
	};
	
	var yLabelFunction = function (v) {
		var unit = $scope.chartOptions.series[0].unit;
		return consumptionFormatFilter(v) + " " + unit;
		};
		
	function tooltipFormatter(x, y, series, ds) {
		var xValue;
		
		var origDateFieldName = series.y + "_date_orig";
		if(ds[origDateFieldName]) {
			xValue = xTooltipFunction(ds[origDateFieldName]) + " (Vorjahr)";
		} else {
			if($scope.showConsumptionYear($scope.type, $scope.period)) {
				xValue = xTooltipFunctionYear(x);  		            				
			} else {
    			xValue = xTooltipFunction(x);  
			}
		}
		
		return  xValue + ": " + yLabelFunction(y);
	}
	
	var chartOptionsXAxesIndex = {type: "linear", key: "index", ticks: 12, ticksRotate: 90, labelFunction: xLabelFunctionYear};
    var chartOptionsXAxesDate = {type: "date", key: "date", ticksRotate: 90, labelFunction: xLabelFunction};
    
	var seriesTemplate = {
            type: "column",
            color: "#0000FF",
            axis: "y",
            unit: "Stück", //custom property. Used by tooltip formatter.
			y: "value_1",
			id: "series_1",
			label: "xxx",
			drawDots: false
        };
	
	var chartOptionsTemplate = {
            axes: {
                y: {type: "linear", min: 0, labelFunction: yLabelFunction}
            },
            margin: {
                left: 100,
                bottom: 130
            },
            series: [
            ],
            tooltip: {mode: "scrubber", formatter: tooltipFormatter}
        };
	
	
	var canceller = $q.defer();

	function getConsumptionScale(periodType) {
		var scale;
		if(periodType === 'year' || periodType === 'gasyear') {
			scale = 'month';
		} else if (periodType === 'month' || periodType === 'week' || periodType === 'custom') {
			scale = 'day';
		} else if(periodType === 'day') {
			scale = 'all';
		} else {
			console.error('unknown period type');
		}

		return scale;
	}
	
	function getLoadprofiles() {
		return [loadprofile].concat($scope.additionalLoadprofiles);
	}
	
	$scope.getLoadprofileNrs = function(){
		return getLoadprofiles().map(function(v) {return v.lpspNr;});
	};
	
	function getLabel(lpspNr) {
		var loadprofiles = getLoadprofiles();
		
		for (var i = 0; i < loadprofiles.length; i++) {
			var lp = loadprofiles[i];
			if(lp.lpspNr === lpspNr) {
				return loadprofileFormatFilter(lp, userSettings);					
			}
		}
	}
	
	function requestChartData(loadChartDataCallback, type, showLastYear, loadprofileNrs, gasday, startDate, endDate, periodType) {
		if(type === 'consumption') {
			var scale = getConsumptionScale(periodType);
			
			if(showLastYear) {
				var cb1 = energydataviewDb.getConsumptionData(canceller, loadprofileNrs, startDate, endDate, scale, gasday);
				var cb2 = energydataviewDb.getConsumptionData(canceller, loadprofileNrs, startDate.clone().subtract(1, 'years'), endDate.clone().subtract(1, 'years'), scale, gasday);
				
				$q.all([cb1, cb2]).then(function(responsesArray) {
					  var resp = responsesArray[0].concat(responsesArray[1]);
					  loadChartDataCallback(resp, function(resp) {
						  energyDataViewUtil.harmonizeYearsForComparision(resp);
					  });
				});
			} else {
				energydataviewDb.getConsumptionData(canceller, loadprofileNrs, startDate, endDate, scale, gasday).then(loadChartDataCallback);
			}
			
		
		} else if (type === 'power' || type === 'powerMax' || type === 'powerAvg') {
			
			if(showLastYear) {
				var cb10 = energydataviewDb.getLoadprofileData(canceller, loadprofileNrs, startDate, endDate, gasday, type === 'powerMax', type === 'powerAvg');
				var cb11 = energydataviewDb.getLoadprofileData(canceller, loadprofileNrs, startDate.clone().subtract(1, 'years'), endDate.clone().subtract(1, 'years'), gasday, type === 'powerMax', type === 'powerAvg');
				
				$q.all([cb10, cb11]).then(function(responsesArray) {
					  var resp = responsesArray[0].concat(responsesArray[1]);
					  loadChartDataCallback(resp, function(resp) {
						  energyDataViewUtil.harmonizeYearsForComparision(resp);
					  });
				});
			} else {
				energydataviewDb.getLoadprofileData(canceller, loadprofileNrs, startDate, endDate, gasday, type === 'powerMax', type === 'powerAvg').then(loadChartDataCallback);
			}
		}
	}
	
	$scope.color = ['#314DFF', '#36E24E', '#DB2118', '#FF67E3', '#FF9329'];

	$scope.getSeriesColor = function(i) {
		var idx = i - (parseInt(i / $scope.color.length) *  $scope.color.length);
		
		return $scope.color[idx];
	};
	
	function loadChartData() {
		
		var startDate = $scope.period.startDate; 
		var endDate = $scope.period.endDate;
		var periodType = $scope.period.type;
		
		canceller.resolve('Canceled'); //cancel old data fetch;
		canceller = $q.defer();
		
		$scope.loading = true;
		
		var convertTimestampToDate = function(respData) {
			
			for(var i = 0; i < respData.length; i++) {
				respData[i].date =  new Date(respData[i].date);
				respData[i].index =  i;
			}
		};
		
		var loadChartDataCallback = function(respQ, adjustDateForComparison) {

			var respDB = energyDataViewUtil.convertQWrapperToDBData(respQ);
			
			if(typeof adjustDateForComparison === 'function') {
				adjustDateForComparison(respDB);
				$scope.dataDateFormatOmitYear = true;
			} else {
				$scope.dataDateFormatOmitYear = false;
			}
			
			var data = energyDataViewUtil.convertToChartData(respDB);
								
			convertTimestampToDate(data);
			
			if($scope.type === 'consumption') {
				var scale = getConsumptionScale(periodType);
				
				if(scale === 'month') {
					$scope.dataDateFormat = dateFormatMonthFilter;
				} else if (scale === 'day') {
					$scope.dataDateFormat = dateFormatDayFilter;
				} else if (scale === 'all') {
					$scope.dataDateFormat = dateFormatTimeHourBackFilter;
				} else {
					console.error('unknown scale type');
				}
			}
			else if( $scope.type === 'powerAvg' ) {
				$scope.dataDateFormat = dateFormatDayFilter;
			} else if($scope.type === 'power' || $scope.type === 'powerMax'){						
				$scope.dataDateFormat = dateFormatTimeFilter;
			}

			var series = [];
			var statistics = [];
			
			for (var i = 0; i < respDB.length; i++) {
				var newSeries = Object.create(seriesTemplate); 
				newSeries.unit = respDB[i].data.unit;
				newSeries.y = "value_" + i;
				newSeries.id = "series_" + i;
				newSeries.color = $scope.getSeriesColor(i);
				newSeries.label = getLabel(respDB[i].data.lpspNr);
				
				if ($scope.type === 'power' || $scope.type === 'powerMax' || $scope.type === 'powerAvg') {
					newSeries.type = "line";
				}
					
				series.push(newSeries);
				statistics.push({unit: respDB[i].data.unit, data: respDB[i].data.statistic});
			}
			
			$scope.chartData = data;
			$scope.statistic = statistics;
			
			var newChartOptions = Object.create(chartOptionsTemplate); 
			
			if($scope.showConsumptionYear($scope.type, $scope.period)) {
				newChartOptions.axes.x = chartOptionsXAxesIndex;
			} else {
				newChartOptions.axes.x = chartOptionsXAxesDate;
			}
			
			newChartOptions.series = series;
			
			$scope.chartOptions = newChartOptions;

			$scope.loading = false;
		};
		
		var gasday = $scope.loadprofile.category === 'Gas' && $scope.userSettings.gasday; 

		requestChartData(loadChartDataCallback, $scope.type, $scope.showLastYear, $scope.getLoadprofileNrs(), gasday, startDate, endDate, periodType);
	}


	
	$scope.displayCustomDateperiodSelection = function() {
			ngDialog.open({ template: 'tpls/energydataview_chart_customtime.html', className: 'ngdialog-theme-default ngdialog-theme-custom', controller: 'CustomDateSelectorController', scope: $scope });
	};
	
	$scope.displayAdditionalLoadprofileSelection = function() {
		ngDialog.open({ template: 'tpls/energydataview_chart_additional_loadprofile_selection.html', className: 'ngdialog-theme-default ngdialog-theme-custom', controller: 'AdditionalLoadprofileSelectionController', scope: $scope });
	};

	
	$scope.setPeriodType = function (newPeriodTypeString, initMomentP, initMomentEndP) {
		var initMoment = initMomentP ? initMomentP : moment();
		var initMomentEnd = initMomentEndP ? initMomentEndP : moment();
		
		var newPeriodType;
		if(newPeriodTypeString === 'day'){
			newPeriodType = new Period.PeriodDay(initMoment);
        } else if (newPeriodTypeString === 'week'){
        	newPeriodType = new Period.PeriodWeek(initMoment);
        } else if (newPeriodTypeString === 'month'){
        	newPeriodType = new Period.PeriodMonth(initMoment);
        } else if (newPeriodTypeString === 'year'){
        	newPeriodType = new Period.PeriodYear(initMoment);
        } else if (newPeriodTypeString === 'gasyear'){
        	newPeriodType = new Period.PeriodGasYear(initMoment);
        } else if (newPeriodTypeString === 'custom'){
        	newPeriodType = new Period.PeriodCustom(initMoment, initMomentEnd);
        }
		
		if($scope.period && (
				($scope.period.powerChartSupported && !newPeriodType.powerChartSupported) ||
				($scope.period.powerMaxChartSupported && !newPeriodType.powerMaxChartSupported) ||
				($scope.period.powerAvgChartSupported && !newPeriodType.powerAvgChartSupported)
		)) {
        	//User switched to a period type which does not support the current chart.
        	//Switching to consumption type.
        	$scope.setTypeInternal('consumption');
        }
		
		$scope.period = newPeriodType;
		$scope.periodTypeHistory.push(newPeriodType);
		
        loadChartData();
	};
	
	
	$scope.periodBack = function() {
		$scope.period.back();
		loadChartData();
	};
	
	$scope.periodNow = function() {
		$scope.period.reset();
        loadChartData($scope.period.startDate, $scope.period.endDate, $scope.period.type);
	};

	$scope.periodForward = function() {
		$scope.period.forward();
		loadChartData();
	};
	
	$scope.setType = function (newType) {
        $scope.setTypeInternal(newType);
        $scope.reloadChartData();
	};
	
	$scope.reloadChartData = function() {
        loadChartData();
	};

	$scope.setTypeInternal = function (newType) {
        $scope.type = newType;
	};
	
	$scope.setShowLastYear = function (showLastYear) {			
        $scope.showLastYear = showLastYear;
        
        $scope.reloadChartData();
	};
	

	$scope.onClick = function(d, i){
		//drill down
		if($scope.type === 'consumption') {
		
			var pt = $scope.period.type;
			
			if(pt === 'year' || pt === 'gasyear') {
				$scope.setPeriodType('month', moment(d.raw.date));
			} else if (pt === 'month' || pt === 'week') {
				$scope.setPeriodType('day', moment(d.raw.date));
			}
		}
	};
	

	$scope.drillUpClick = function(){
		//drill up
		$scope.periodTypeHistory.pop();
		var lastPeriodType = $scope.periodTypeHistory.pop();
		
		$scope.setPeriodType(lastPeriodType.type, lastPeriodType.startDate, lastPeriodType.endDate);
	};

	
	$scope.showConsumptionYear = function(type, period) {
		return type === 'consumption' && ( period.type === 'year' || period.type === 'gasyear' );
	};
	
	$scope.setAdditionalLoadprofiles = function(addLp) {
		$scope.additionalLoadprofiles = addLp;
	};
	
	$scope.showSelectType = function() {
		$scope.exportVisible = false;
		$scope.selectAdditionalLoadprofilesVisible = false;
		$scope.selectAdditionalSettingsVisible = false;
		$scope.selectTypeVisible = !$scope.selectTypeVisible;
	};

	$scope.setTypeClick = function (newType) {
		$scope.setType(newType);
		$scope.selectTypeVisible = false;
	};
	
	$scope.showSelectAdditionalLoadprofiles = function() {
		$scope.selectAdditionalSettingsVisible = false;
		$scope.selectTypeVisible = false;
		$scope.exportVisible = false;
		$scope.selectAdditionalLoadprofilesVisible = !$scope.selectAdditionalLoadprofilesVisible;
		$scope.$broadcast('SelectAdditionalLoadprofiles_Opened');
	};
	
	$scope.showSelectAdditionalSettings = function() {
		$scope.selectAdditionalLoadprofilesVisible = false;
		$scope.selectTypeVisible = false;
		$scope.exportVisible = false;
		$scope.selectAdditionalSettingsVisible = !$scope.selectAdditionalSettingsVisible;
	};
	
	$scope.formatDate = function(date) {
		if($scope.dataDateFormat) {
			return $scope.dataDateFormat(date);				
		}
	};
	
	$scope.setPeriodType('year'); //init the period type.
}]);