'use strict';

app.controller('EditFloorController',["$scope", "$rootScope", "$state", "$stateParams",
                                      function($scope, $rootScope, $state, $stateParams) {
	$scope.floor = {};
	
	$scope.floor.name = $rootScope.houses[$rootScope.houseIdx].floors[$stateParams.floorId].name;
	
	$scope.floor.name = $rootScope.
	
	$scope.save = function() {
		
		 $rootScope.houses[$rootScope.houseIdx].floors[$stateParams.floorId].name = $scope.floor.name;
    };
    
    $scope.cancel = function() {
		
    	 $scope.floor.name = $rootScope.houses[$rootScope.houseIdx].floors[$stateParams.floorId].name;
   };
   
}]);