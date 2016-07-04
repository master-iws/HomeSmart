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
		$scope.floorIdx = $scope.houses[$rootScope.houseIndex].getFloors().indexOf($scope.room.getFloor());
		$scope.roomIdx = $rootScope.houses[$rootScope.houseIndex].getFloors()[$scope.floorIdx].getRooms().indexOf($scope.originalRoom);
		$rootScope.houses[$rootScope.houseIndex].getFloors()[$scope.floorIdx].getRooms()[$scope.roomIdx] = $scope.room;
		mainService.saveHouses($rootScope.houses);
		$state.go("houseconfiguration.rooms");
    };
    
    $scope.cancel = function() {
    	vibrator.vibrate(10);
    	 
    };
    
    $scope.addComponent = function() {
		$state.go("houseconfiguration.rooms.addComponent",{roomId:$scope.roomId});
   };
   
   $scope.editComponent = function($id) {
		$state.go("houseconfiguration.rooms.editComponent",{componentId:$id});
  };
  
  $scope.deleteComponent = function($idx) {
	  $scope.originalRoom.getComponents().splice($idx,1);
		mainService.saveHouses($rootScope.houses);
	    
};
   
}]);