'use strict';

app.controller('AddTimePeriodController',["$scope", "$rootScope", "$state", "$stateParams", "MainService",
                                      function($scope, $rootScope, $state, $stateParams, mainService) {
	
	$scope.validationMessage = null;
	$scope.time = {};
	$scope.time.start;
	$scope.time.end;
	$scope.time.temp;
	//$scope.room = $rootScope.houses[$rootScope.houseIndex].getRoomById($rootScope.roomId);
	//$scope.component = $room.getComponents()[$rootScope.componentIdx];
	//day
	//cold warm
	
	$scope.save = function()
	{
		
		if($scope.validate())
		{
		$scope.component.getSettings()[$scope.mode].times.push($scope.time);
		mainService.saveHouses($rootScope.houses);
		$state.go("rooms.detail.heatingAutopilot");
		}
		else
			$scope.validationMessage ="Zeiten überschneiden sich.";
	}
	
	$scope.validate = function()
	{
		
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

	  $scope.changed = function () {
	    
	  };

	  $scope.clear = function() {
	    $scope.mytime = null;
	  };
}]);