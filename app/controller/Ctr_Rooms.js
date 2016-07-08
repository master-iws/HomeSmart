'use strict';

app.controller('RoomsController',["$scope", "$rootScope", "$state","$uibModal","vibrator",
                                                    function($scope, $rootScope, $state,$uibModal,vibrator) {
	
	$scope.floorId = -1;
    $scope.floors = [];
	$scope.floor = new Mod_Room();
	$scope.floor.setId(-1);
	$scope.floor.setName("Alle Etagen");
	$scope.floors.push($scope.floor);
	$scope.floors = $scope.floors.concat($rootScope.houses[$rootScope.houseIndex].getFloors());
	
	$scope.rooms = $rootScope.houses[$rootScope.houseIndex].getRooms();

    $scope.addRoom = function() {
    	$state.go("houseconfiguration.rooms.addRoom");
    };
	                                                    
	$scope.showRoom = function($roomIdx) {
	    $state.go("rooms.detail", {'roomId':$roomIdx});
	};
    
    $scope.editRoom = function($roomIdx) {
    	$state.go("houseconfiguration.rooms.editRoom",{'roomId':$roomIdx});
    };
    
    $scope.lightOff = function($roomIdx) {
    	vibrator.vibrate(1000);
    	$rootScope.houses[$rootScope.houseIndex].getRooms()[$roomIdx].setLight(0);
    };
    
    $scope.consumerOff = function($roomIdx) {
    	vibrator.vibrate(1000);
    	$rootScope.houses[$rootScope.houseIndex].getRooms()[$roomIdx].setConsumer(0);
    };
	
    $scope.setShadowing = function($roomIdx, $value) {
    	vibrator.vibrate(1000);
    	$rootScope.houses[$rootScope.houseIndex].getRooms()[$roomIdx].setShadowing($value);
    };
    
    $scope.configureRoom = function($roomId) {
    	$state.go("houseconfiguration.rooms.editRoom",{roomId: $roomId});
    };
    
    $scope.floorChanged = function()
	{
		
		if($scope.roomId == -1)
			$scope.rooms = $rootScope.houses[$rootScope.houseIndex].getRooms();
		else
			$scope.rooms = $rootScope.houses[$rootScope.houseIndex].getFloorById($scope.floorId).getRooms();
	}
}]);