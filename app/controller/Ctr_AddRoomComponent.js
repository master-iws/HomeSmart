'use strict';


app.controller('AddHouseComponentController',["$scope", "$rootScope", "$state", "$stateParams", "MainService","ComponentService","vibrator",
                                      function($scope, $rootScope, $state, $stateParams, mainService,componentService,vibrator) {
	
	$scope.roomId = $stateParams.roomId;
	
	$scope.name = "";
	$scope.serialId = "";
	$scope.category;
	$scope.categorys = componentService.getCategorys();
	$scope.components;

	$scope.save = function() {
		vibrator.vibrate(10);
		$scope.newComponent = componentService.getNewComponentInstanceById($scope.type.getId());
		$scope.newComponent.setType($scope.type.getId());
		$scope.newComponent.setId($rootScope.nextComponentId++);
		$scope.newComponent.setName($scope.name);
		$scope.newComponent.setSerialId($scope.serialId);
		$scope.newComponent.setCategory($scope.category);
		 
		$rootScope.houses[$rootScope.houseIndex].getComponents().push($scope.newComponent);
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