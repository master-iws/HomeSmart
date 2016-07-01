'use strict';

app.controller('HeatingAutopilotController',["$scope", "$rootScope", "$state", "MainService",	
                                         function($scope, $rootScope, $state, mainService) {
	
	$scope.heatPeriod = [0,5];
	
	$scope.heatTimes = [];
	$scope.monday = [];
	$scope.time = {start: '10:00', end: '13:00', temp: '20'};
	$scope.monday.push($scope.time);
	$scope.monday.push($scope.time);
	$scope.heatTimes.push($scope.monday);
	$scope.heatTimes.push($scope.monday);
	$scope.heatTimes.push($scope.monday);
	$scope.heatTimes.push($scope.monday);
	$scope.heatTimes.push($scope.monday);
	$scope.heatTimes.push($scope.monday);
	$scope.heatTimes.push($scope.monday);
	
	console.log($scope.heatTimes);
	console.log($scope.heatTimes[0])
	
	$scope.coolingPeriod = [2,4];
	
	$scope.deleteTime = function(day, timeIdx)
	{
		//console.log($scope.heatTimes);
		$scope.heatTimes[day].splice(timeIdx,1)
	}
	
	$scope.addTime = function(day)
	{
		//console.log($scope.heatTimes);
		//componente in rootscope
		$state.go("rooms.detail.addTimePeriod");
	};
	
	
	
}]);