'use strict';

app.controller('RoomsController',["$scope", "$rootScope", "$state","$uibModal",	
                                                    function($scope, $rootScope, $state,$uibModal) {
	
	
	$scope.rooms = $rootScope.houses[$rootScope.houseIndex].getRooms();
	console.log("Eäume"+$scope.rooms);
	
    $scope.addRoom = function() {
    	$state.go("houseconfiguration.rooms.addRoom");
    };
    
    $scope.editRoom = function($roomIdx) {
    	$state.go("houseconfiguration.rooms.editRoom",{'roomId':$roomIdx});
    };
}]);