'use strict';

/**
 * @author Julia Thüroff
 */
app.controller('AddRoomComponentController',["$scope", "$rootScope", "$state", "$stateParams", "MainService","ComponentService","vibrator",
                                      function($scope, $rootScope, $state, $stateParams, mainService,componentService,vibrator) {
	
	$scope.roomId = $stateParams.roomId;
	
	$scope.name = "";
	$scope.serialId = "";
	$scope.categorys = componentService.getCategorys();
	$scope.category = $scope.categorys[0];
	$scope.components;

	$scope.save = function() {
		vibrator.vibrate(10);
		$scope.newComponent = componentService.getNewComponentInstanceByType($scope.type.getType());
		$scope.newComponent.setType($scope.type.getId());
		$scope.newComponent.setId($rootScope.nextComponentId);
		$rootScope.nextComponentId++;
		$scope.newComponent.setName($scope.name);
		$scope.newComponent.setSerialId($scope.serialId);
		$scope.newComponent.setCategory($scope.category);
		 
		$rootScope.houses[$rootScope.houseIndex].getRoomById($scope.roomId).getComponents().push($scope.newComponent);
		mainService.saveHouses($rootScope.houses);
		$state.go("houseconfiguration.rooms.editRoom",{roomId: $scope.roomId});
    };
    
    $scope.cancel = function() {
    	vibrator.vibrate(10);
		$state.go("houseconfiguration.rooms");
   };
   
   $scope.categoryChanged = function() {
		$scope.components = componentService.getComponentsByCategory($scope.category.getId());
		$scope.type = $scope.components[0];
   };
   
  $scope.categoryChanged();
}]);