'use strict';


app.controller('EditHouseComponentController',["$scope", "$rootScope", "$state", "$stateParams", "MainService","ComponentService","vibrator",
                                      function($scope, $rootScope, $state, $stateParams, mainService,componentService,vibrator) {
	
	$scope.componentIdx = $stateParams.componentIdx;
	$scope.originalComponent = $rootScope.houses[$rootScope.houseIndex].getComponents()[$scope.componentIdx];
	$scope.component = new Mod_Component();
	$scope.component.setHouse($scope.originalComponent.getHouse());
	$scope.component.setTyp($scope.originalComponent.getTyp());
	$scope.category = $scope.originalComponent.getCategory();
	$scope.component.setName($scope.originalComponent.getName());

	$scope.save = function() {
		vibrator.vibrate(10);
		 //$scope.room.setId($rootScope.nextId);
		$scope.component.setCategory($scope.category);
		$rootScope.houses[$rootScope.houseIndex].getComponents()[$scope.componentIdx]=$scope.component;
		mainService.saveHouses($rootScope.houses);
		$state.go("houseconfiguration.rooms.detail",{roomId:$scope.roomId});
    };
    
    $scope.cancel = function() {
    	vibrator.vibrate(10);
		$state.go("houseconfiguration.rooms.detail",{roomId:$scope.roomId});
   };
   
   $scope.categoryChanged = function($id) {
		$state.components = componentService.getComponentsByCategory($id);
  };
   
}]);