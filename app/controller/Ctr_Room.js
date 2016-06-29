'use strict';

app.controller('RoomController',["$scope", "$rootScope", "$state", "$stateParams",
                                      function($scope, $rootScope, $state, $stateParams) {

	$scope.roomId = $stateParams.roomId;
	//$scope.selectedRoom = $rootScope.houses[$rootScope.houseIndex].getRoomById($scope.roomId);
	//console.log('KOMPONENTEN: '+$scope.selectedRoom.getComponentsByCategory());
	
	                                      
	$scope.addRoom = function() {
		$state.go("houseconfiguration.rooms.addRoom");
    };
	                                      
	$scope.showRoom = function($roomId) {
		
		$state.go("rooms.detail", {'roomId':$roomId});
	};
   
}]);