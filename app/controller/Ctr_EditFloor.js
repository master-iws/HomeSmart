'use strict';
/**
 * @author Julia Thüroff
 */
app.controller('EditFloorController',["$scope", "$rootScope", "$state", "$stateParams","MainService","vibrator",
                                      function($scope, $rootScope, $state, $stateParams,mainService,vibrator) {
	
	mainService.saveHouses($rootScope.houses);
	
	$scope.originalFloor = $rootScope.houses[$rootScope.houseIndex].getFloorById($stateParams.floorId);
	
	$scope.floor = new Mod_Floor();
	$scope.floor.setId($scope.originalFloor.getId());
	$scope.floor.setHouse($scope.originalFloor.getHouse());
	$scope.floor.setName($scope.originalFloor.getName());
	
	$scope.save = function() {
		vibrator.vibrate(10);
		 $scope.originalFloor.setName($scope.floor.getName());
		 mainService.saveHouses($rootScope.houses);
		 $state.go("houseconfiguration.floors");
    };
    
    $scope.cancel = function() {
    	vibrator.vibrate(10);
    	$scope.floor.setName($scope.originalFloor.getName());
   };
   
}]);