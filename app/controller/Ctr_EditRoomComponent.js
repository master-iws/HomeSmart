'use strict';


app.controller('EditRoomComponentController',["$scope", "$rootScope", "$state", "$stateParams", "MainService","ComponentService","vibrator",
                                      function($scope, $rootScope, $state, $stateParams, mainService,componentService,vibrator) {
	
	$scope.componentIdx = $stateParams.componentIdx;
	$scope.originalComponent = $rootScope.houses[$rootScope.houseIndex].getComponents()[$scope.componentIdx];
	$scope.component = new Mod_Component();
	$scope.component.setRoom($scope.originalComponent.getRoom());
	$scope.component.setTyp($scope.originalComponent.getTyp());
	$scope.category = $scope.originalComponent.getCategory();
	$scope.component.setName($scope.originalComponent.getName());

	$scope.save = function() {
		vibrator.vibrate(10);
		 $scope.originalComponent.setName($scope.component.getName());
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