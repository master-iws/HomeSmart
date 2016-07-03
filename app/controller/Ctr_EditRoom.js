'use strict';

app.controller('EditRoomController',["$scope", "$rootScope", "$state", "$stateParams","MainService","vibrator",
                                      function($scope, $rootScope, $state, $stateParams,mainService,vibrator) {
	
	$scope.roomId = $stateParams.roomId;
	$scope.originalRoom = $rootScope.houses[$rootScope.houseIndex].getRoomById($scope.roomId);
	$scope.room = new Mod_Room();
	$scope.room.setId($scope.originalRoom.getId());
	$scope.room.setFloor($scope.originalRoom.getFloor());
	$scope.room.setName($scope.originalRoom.getName());
	$scope.room.setComponents($scope.originalRoom.getComponents());
	
	$scope.floorId = $scope.originalRoom.getFloor().getId();
	
	$scope.save = function() {
		
		vibrator.vibrate(10);
		$rootScope.houses[$rootScope.houseIndex].getRoomById($scope.roomId) = $scope.room;
		mainService.saveHouses($rootScope.houses);
		//$rootScope.houses[$rootScope.houseIdx].floors[$stateParams.floorId] = $scope.room;
		$state.go("houseconfiguration.rooms");
    };
    
    $scope.cancel = function() {
    	vibrator.vibrate(10);
    	 
    };
   
}]);