'use strict';

app.controller('AddFloorController',["$scope", "$rootScope", "$state", "$stateParams",
                                      function($scope, $rootScope, $state, $stateParams) {
	$scope.floor = {};
	$scope.floor.name = ""
	
	$scope.save = function() {
		//etagen anlegen
		 $rootScope.houses[$rootScope.houseIndex].push($scope.floor);
		 $state.go("settings.floors");
    };
    
    $scope.cancel = function() {
		
    	 $state.go("settings.houses");
   };
   
}]);