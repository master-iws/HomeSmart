'use strict';


app.controller('AddHouseComponentController',["$scope", "$rootScope", "$state", "$stateParams", "MainService","ComponentService","vibrator",
                                      function($scope, $rootScope, $state, $stateParams, mainService,componentService,vibrator) {
	
	$scope.roomId = $stateParams.roomId;
	
	$scope.component = new Mod_Component();
	$scope.component.setRoom($rootScope.houses[$rootScope.houseIndex].getRoomById($scope.roomId));
	$scope.categorys = componentService.getCategorys();
	$scope.components;

	$scope.save = function() {
		vibrator.vibrate(10);
		 //$scope.room.setId($rootScope.nextId);
		$scope.component.setCategory($scope.category);
		 $rootScope.houses[$rootScope.houseIndex].getComponents().push($scope.component);
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