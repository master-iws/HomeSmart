'use strict';

app.controller('EditFloorController',["$scope", "$rootScope", "$state", "$stateParams",
                                      function($scope, $rootScope, $state, $stateParams) {
	
	$scope.originalFloor = $rootScope.houses[$rootScope.houseIndex].getFloors()[$stateParams.floorId];
	$scope.floor = new Mod_Floor();
	$scope.floor.setName($scope.originalFloor.getName());
	
	$scope.save = function() {
		
		 $scope.originalFloor.setName($scope.floor.getName());
		 mainService.saveHouses($rootScope.houses);
    };
    
    $scope.cancel = function() {
		
    	$scope.floor.setName($scope.originalFloor.getName());
   };
   
}]);