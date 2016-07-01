'use strict';

app.controller('AddFloorController',["$scope", "$rootScope", "$state", "$stateParams", "MainService","vibrator",
                                      function($scope, $rootScope, $state, $stateParams, mainService,vibrator) {
	
	$scope.floor = new Mod_Floor();
	
	$scope.save = function() {
		vibrator.vibrate(10);
		$scope.floor.setId($rootScope.nextFloorId);
		$rootScope.nextFloorId++;
		$rootScope.houses[$rootScope.houseIndex].addFloor($scope.floor);
		mainService.saveHouses($rootScope.houses);
		$state.go("houseconfiguration.floors");
    };
    
    $scope.cancel = function() {
    	vibrator.vibrate(10);
    	 $state.go("houseconfiguration.floors");
   };
   
}]);