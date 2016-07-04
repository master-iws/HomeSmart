'use strict';


app.controller('EditHouseComponentController',["$scope", "$rootScope", "$state", "$stateParams", "MainService","ComponentService","vibrator",
                                      function($scope, $rootScope, $state, $stateParams, mainService,componentService,vibrator) {
	
	$scope.componentIdx = $stateParams.componentIdx;
	
	$scope.originalComponent = $rootScope.houses[$rootScope.houseIndex].getComponents()[$scope.componentIdx];
	
	$scope.name = $scope.originalComponent.getName();
	$scope.serialId = $scope.originalComponent.getSerialId();
	$scope.category = $scope.originalComponent.getCategory()
	$scope.categorys = componentService.getCategorys();
	$scope.components;


	$scope.save = function() {
		vibrator.vibrate(10);
		
		$rootScope.houses[$rootScope.houseIndex].getComponents()[$scope.componentIdx].setName($scope.name);
		mainService.saveHouses($rootScope.houses);
		$state.go("houseconfiguration.house");
    };
    
    $scope.cancel = function() {
    	vibrator.vibrate(10);
		$state.go("houseconfiguration.house");
   };
   
   $scope.categoryChanged = function() {
		$scope.components = componentService.getComponentsByCategory($scope.category.getId());
 };
  

   
}]);