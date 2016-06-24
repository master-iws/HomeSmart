'use strict';

app.controller('RoomsHouseConfigurationController',["$scope", "$rootScope", "$state","$uibModal",	
                                                    function($scope, $rootScope, $state,$uibModal) {
	
	$scope.floorIdx = 0;//ändern
	
	$scope.deleteRoom = function($roomIdx) {
		
		$scope.deleteIdx = $roomIdx;
		var modalInstance = $uibModal.open({
		      animation: $scope.animationsEnabled,
		      templateUrl: 'app/views/dialog/deleteRoomDialog.htm',
		      controller: 'DeleteRoomController',
		      scope: $scope
		    });
    };
    
    $scope.addRoom = function() {
    	$state.go("houseconfiguration.rooms.addRoom");
    };
    
    $scope.editRoom = function($roomId) {
    	$state.go("houseconfiguration.rooms.editRoom",{'roomId':$roomId});
    };
}]);