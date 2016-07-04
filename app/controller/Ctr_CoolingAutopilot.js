'use strict';

app.controller('CoolingAutopilotController',["$scope", "$rootScope", "$state", "MainService",	
                                         function($scope, $rootScope, $state, mainService) {
	
	//$scope.room = $rootScope.houses[$rootScope.houseIndex].getRoomById($rootScope.roomId);
	//$scope.component = $room.getComponents()[$rootScope.componentIdx];
	
	$scope.months =['Januar','Februar','März','April','Mai','Juni','Juli','August','September','Oktober','November','Dezember'];
	
	$scope.component = new Mod_Component();
	$scope.settings = [];
	$scope.settings[0] = 23;
	$scope.settings[1] = 0;
	$scope.settings[2] = {};
	$scope.settings[2].start = 0;
	
	$scope.settings[2].end = 0;
	$scope.settings[2].times = [];
	$scope.settings[3] = {};
	$scope.settings[3].start = 0;
	$scope.settings[3].end = 0;
	$scope.settings[3].times = [];
	$scope.monday = [];
	$scope.time = {start: '10:00', end: '13:00', temp: '20'};
	$scope.monday.push($scope.time);
	$scope.settings[2].times.push($scope.monday);
	$scope.component.setSettings($scope.settings);
	
	$scope.deleteTime = function(day, timeIdx)
	{
		$scope.component.getSettings()[3].times[day].splice(timeIdx,1)
	}
	

	$scope.addTime = function(day)
	{
		//console.log($scope.heatTimes);
		//componente in rootscope
		$state.go("rooms.detail.addTimePeriod");
	};
	
	$scope.prevTab = function()
	{
		$state.go("heatingAutopilot");
	}
	
}]);