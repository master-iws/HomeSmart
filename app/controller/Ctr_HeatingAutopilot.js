'use strict';

app.controller('HeatingAutopilotController',["$scope", "$rootScope", "$state", "MainService",	
                                         function($scope, $rootScope, $state, mainService) {
	
	$scope.componentId = $stateParams.componentId;
	$scope.component = $rootScope.houses[$rootScope.houseIndex].getComponentById($rootScope.componentId);
	
	$scope.months =['Januar','Februar','März','April','Mai','Juni','Juli','August','September','Oktober','November','Dezember'];
	
		
	$scope.deleteTime = function(day, timeIdx)
	{
		$scope.component.getSettings()[2].times[day].splice(timeIdx,1)
		mainService.saveHouses($rootScope.houses);
	}
	
	$scope.addTime = function(day)
	{
		$rootScope.component = $scope.component;
		$rootScope.mode = 2;
		$rootScope.day = day;
		$state.go("rooms.detail.addTimePeriod");
	};
	
	$scope.nextTab = function()
	{
		$state.go("rooms.detail.coolingAutopilot",{componentId: $scope.componentId});
	}
	
}]);