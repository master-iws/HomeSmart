'use strict';

app.controller('AddFloorController',["$scope", "$rootScope", "$state", "$stateParams", "MainService",
                                      function($scope, $rootScope, $state, $stateParams, mainService) {
	
	$scope.floor = new Mod_Floor();
	
	$scope.save = function() {
		$rootScope.houses[$rootScope.houseIndex].push($scope.floor);
		mainService.saveHouses($rootScope.houses);
		$state.go("settings.floors");
    };
    
    $scope.cancel = function() {
		
    	 $state.go("settings.houses");
   };
   
}]);