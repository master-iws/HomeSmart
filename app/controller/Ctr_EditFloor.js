'use strict';

app.controller('EditFloorController',["$scope", "$rootScope", "$state", "$stateParams","MainService",
                                      function($scope, $rootScope, $state, $stateParams,mainService) {
	
	$scope.originalFloor = $rootScope.houses[$rootScope.houseIndex].getFloorById($stateParams.floorId);
	
	$scope.floor = new Mod_Floor();
	$scope.floor.setId($scope.originalFloor.getId());
	$scope.floor.setHouse($scope.originalFloor.getHouse());
	$scope.floor.setName($scope.originalFloor.getName());
	
	$scope.save = function() {
		
		 $scope.originalFloor.setName($scope.floor.getName());
		 mainService.saveHouses($rootScope.houses);
		 $state.go("houseconfiguration.floors");
    };
    
    $scope.cancel = function() {
		
    	$scope.floor.setName($scope.originalFloor.getName());
   };
   
}]);