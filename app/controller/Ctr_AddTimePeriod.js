'use strict';
/**
 * @author Julia Thüroff
 */
app.controller('AddTimePeriodController',["$scope", "$rootScope", "$state", "$stateParams", "MainService",
                                      function($scope, $rootScope, $state, $stateParams, mainService) {
	mainService.saveHouses($rootScope.houses);
	
	
	$scope.validationMessage = null;
	$scope.time = {};
	$scope.time.start;
	$scope.time.end;
	$scope.time.temp;
	
	$scope.save = function()
	{
		
		if($scope.validate())
		{
			$rootScope.component.getSettings()[$rootScope.mode].times[$rootScope.day].push($scope.time);
			mainService.saveHouses($rootScope.houses);
			if($rootScope.mode == 2)
				$state.go("rooms.detail.heatingAutopilot",{componentId: $rootScope.component.getId()});
			else
				$state.go("rooms.detail.coolingAutopilot",{componentId: $rootScope.component.getId()});
		}
		else
			$scope.validationMessage ="Zeiten überschneiden sich.";
	}
	
	$scope.validate = function()
	{
		return true;
	}
	
	$scope.cancel = function()
	{
		$state.go("rooms.detail.heatingAutopilot");
	}
		
	$scope.mytime = new Date();

	  $scope.hstep = 1;
	  $scope.mstep = 15;

	  $scope.options = {
	    hstep: [1, 2, 3],
	    mstep: [1, 5, 10, 15, 25, 30]
	  };

	  $scope.ismeridian = true;
	  $scope.toggleMode = function() {
	    $scope.ismeridian = ! $scope.ismeridian;
	  };

	  $scope.update = function() {
	    var d = new Date();
	    d.setHours( 14 );
	    d.setMinutes( 0 );
	    $scope.mytime = d;
	  };
}]);