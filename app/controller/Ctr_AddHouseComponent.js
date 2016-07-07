'use strict';

/**
 * @author Julia Thüroff
 */
app.controller('AddHouseComponentController',["$scope", "$rootScope", "$state", "$stateParams", "MainService","ComponentService","vibrator",
                                      function($scope, $rootScope, $state, $stateParams, mainService,componentService,vibrator) {
	
	mainService.saveHouses($rootScope.houses);
	
	$scope.roomId = $stateParams.roomId;
	
	$scope.name = "";
	$scope.serialId = "";
	
	$scope.categorys = componentService.getCategorys();
	$scope.category = $scope.categorys[0];
	$scope.components;
	
	

	$scope.save = function() {
		vibrator.vibrate(10);
		$scope.newComponent = componentService.getNewComponentInstanceById($scope.type.getId());
		$scope.newComponent.setType($scope.type.getId());
		$scope.newComponent.setId($rootScope.nextComponentId);
		$rootScope.nextComponentId++;
		$scope.newComponent.setName($scope.name);
		$scope.newComponent.setSerialId($scope.serialId);
		$scope.newComponent.setCategory($scope.category);
		 
		$rootScope.houses[$rootScope.houseIndex].getComponents().push($scope.newComponent);
		mainService.saveHouses($rootScope.houses);
		$state.go("houseconfiguration.house");
    };
    
    $scope.cancel = function() {
    	vibrator.vibrate(10);
		$state.go("houseconfiguration.house");
   };
   
   $scope.categoryChanged = function() {
		$scope.components = componentService.getComponentsByCategory($scope.category.getId());
		$scope.type = $scope.components[0];
  };
  
  $scope.categoryChanged();
  $scope.component = $scope.components[0];
   
}]);