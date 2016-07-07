'use strict';
/**
 * @author Julia Thüroff
 */
app.controller('AddFloorController',["$scope", "$rootScope", "$state", "$stateParams", "MainService","vibrator",
                                      function($scope, $rootScope, $state, $stateParams, mainService,vibrator) {
	
	mainService.saveHouses($rootScope.houses);
	
	$scope.floor = new Mod_Floor();
	$scope.floor.setHouse($rootScope.houses[$rootScope.houseIndex]);
	
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