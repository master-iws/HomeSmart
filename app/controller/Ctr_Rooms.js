'use strict';

app.controller('RoomsController',["$scope", "$rootScope", "$state","$uibModal",	
                                                    function($scope, $rootScope, $state,$uibModal) {
	
	
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
    	$rootScope.houses[$rootScope.houseIndex].getRooms()[$roomIdx].setLight(0);
    };	
    
    $scope.consumerOff = function($roomIdx) {
    	$rootScope.houses[$rootScope.houseIndex].getRooms()[$roomIdx].setConsumer(0);
    };	
	
    $scope.setShadowing = function($roomIdx, $value) {
    	$rootScope.houses[$rootScope.houseIndex].getRooms()[$roomIdx].setShadowing($value);
    };
    
   $scope.addRoom = function() {
    	
    	$state.go("houseconfiguration.rooms.addRoom");
    };
    
    $scope.configureRoom = function($roomId) {
    	
    	$state.go("houseconfiguration.rooms.editRoom",{roomId: $roomId});
    };
}]);