'use strict';

/**
 * @author Julia Thüroff
 */
app.controller('EditRoomComponentController',["$scope", "$rootScope", "$state", "$stateParams", "MainService","ComponentService","vibrator",
                                      function($scope, $rootScope, $state, $stateParams, mainService,componentService,vibrator) {
	
	mainService.saveHouses($rootScope.houses);
	
	$scope.componentId = $stateParams.componentId;
	
	$scope.originalComponent = $rootScope.houses[$rootScope.houseIndex].getComponentById($scope.componentId);
	//console.log($scope.originalComponent.getRoom().getId());
	$scope.name = $scope.originalComponent.getName();


	$scope.save = function() {
		vibrator.vibrate(10);
		
		$rootScope.houses[$rootScope.houseIndex].getComponentById($scope.componentId).setName($scope.name);
		mainService.saveHouses($rootScope.houses);
		$state.go("houseconfiguration.rooms.editRoom",{roomId: $scope.originalComponent.getRoom().getId()});
    };
    
    $scope.cancel = function() {
    	vibrator.vibrate(10);
		$state.go("houseconfiguration.rooms");
   };
   
   $scope.categoryChanged = function() {
		$scope.components = componentService.getComponentsByCategory($scope.category.getId());
 };
  

   
}]);