'use strict';
/**
 * @auhtor Julia Thüroff
 */
app.controller('HeatingAutopilotController',["$scope", "$rootScope", "$state","$stateParams", "MainService",	
                                         function($scope, $rootScope, $state,$stateParams, mainService) {
	
	$scope.componentId = $stateParams.componentId;
	
	console.log($scope.componentId);
	
	$scope.component = $rootScope.houses[$rootScope.houseIndex].getComponentById($scope.componentId);
	
	console.log($scope.component.getSettings());
	
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
		$state.go("addTimePeriod");
	};
	
	$scope.nextTab = function()
	{
		$state.go("coolingAutopilot",{componentId: $scope.componentId});
	}
	
}]);