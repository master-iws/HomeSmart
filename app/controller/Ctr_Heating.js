'use strict';
/**
 * @author Julia Thüroff
 */
app.controller('HeatingController',["$scope", "$rootScope", "$state", "$stateParams",
                                      function($scope, $rootScope, $state, $stateParams) {

	mainService.saveHouses($rootScope.houses);
	
	$scope.component;
	
	$scope.modes = ['Autopilot','Manueller Betrieb'];
	
	
	$scope.configureHeatingAutopilot = function()
	{
		$state.go("rooms.detail.heatingAutopilot",{componentId:$scope.component.getId()});
	}
	
}]);