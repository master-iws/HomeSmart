'use strict';
/**
 * @author Julia Thüroff
 */
app.controller('CoolingAutopilotController',["$scope", "$rootScope", "$state","$stateParams", "MainService",	
                                         function($scope, $rootScope, $state,$stateParams, mainService) {
	
	$scope.componentId = $stateParams.componentId;
	$scope.component = $rootScope.houses[$rootScope.houseIndex].getComponentById($rootScope.componentId);
	
	$scope.months =['Januar','Februar','März','April','Mai','Juni','Juli','August','September','Oktober','November','Dezember'];
	
	
	$scope.deleteTime = function(day, timeIdx)
	{
		$scope.component.getSettings()[3].times[day].splice(timeIdx,1);
		mainService.saveHouses($rootScope.houses);
	}
	

	$scope.addTime = function(day)
	{
		$rootScope.component = $scope.component;
		$rootScope.mode = 3;
		$rootScope.day = day;
		$state.go("addTimePeriod");
	};
	
	$scope.prevTab = function()
	{
		$state.go("heatingAutopilot",{componentId: $scope.componentId});
	}
	
}]);