'use strict';

app.controller('AddFloorController',["$scope", "$rootScope", "$state", "$stateParams", "MainService",
                                      function($scope, $rootScope, $state, $stateParams, mainService) {
	
	$scope.floor = new Mod_Floor();
	
	$scope.save = function() {
		console.log($scope.floor.toJSON());
		$rootScope.houses[$rootScope.houseIndex].addFloor($scope.floor);
		mainService.saveHouses($rootScope.houses);
		$state.go("houseconfiguration.floors");
    };
    
    $scope.cancel = function() {
		
    	 $state.go("settings.houses");
   };
   
}]);