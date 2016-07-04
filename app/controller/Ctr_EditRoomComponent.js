'use strict';


app.controller('EditHouseComponentController',["$scope", "$rootScope", "$state", "$stateParams", "MainService","ComponentService","vibrator",
                                      function($scope, $rootScope, $state, $stateParams, mainService,componentService,vibrator) {
	
	$scope.componentIdx = $stateParams.componentIdx;
	
	$scope.originalComponent = $rootScope.houses[$rootScope.houseIndex].getRooms().getComponents()[$scope.componentIdx];
	
	$scope.name = $scope.originalComponent.getName();


	$scope.save = function() {
		vibrator.vibrate(10);
		
		$rootScope.houses[$rootScope.houseIndex].getComponents()[$scope.componentIdx].setName($scope.name);
		mainService.saveHouses($rootScope.houses);
		$state.go("houseconfiguration.rooms");
    };
    
    $scope.cancel = function() {
    	vibrator.vibrate(10);
		$state.go("houseconfiguration.rooms");
   };
   
   $scope.categoryChanged = function() {
		$scope.components = componentService.getComponentsByCategory($scope.category.getId());
 };
  

   
}]);