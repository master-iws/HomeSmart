'use strict';

app.controller('AddFloorController',["$scope", "$rootScope", "$state", "$stateParams", "MainService",
                                      function($scope, $rootScope, $state, $stateParams, mainService) {
	
	$scope.floor = new Mod_Floor();
	
	$scope.save = function() {
		$scope.floor.setId($rootScope.nextFloorId);
		$rootScope.nextFloorId++;
		$rootScope.houses[$rootScope.houseIndex].addFloor($scope.floor);
		mainService.saveHouses($rootScope.houses);
		$state.go("houseconfiguration.floors");
    };
    
    $scope.cancel = function() {
		
    	 $state.go("houseconfiguration.floors");
   };
   
}]);