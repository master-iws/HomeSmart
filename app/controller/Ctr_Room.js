'use strict';
/**
 * @author Matthias Jakob
 * @author Julia Thüroff
 */
app.controller('RoomController',["$scope", "$rootScope", "$state", "$stateParams","MainService", "shouldSwipe",
                                      function($scope, $rootScope, $state, $stateParams,mainService, shouldSwipe) {

	$scope.roomId = $stateParams.roomId;
	$scope.selectedRoom = $rootScope.houses[$rootScope.houseIndex].getRoomById($scope.roomId);
	$scope.componentsByCategory = $scope.selectedRoom.getComponentsByCategory();
	                                      
	$scope.modes = ['Autopilot','Manueller Betrieb'];
	
	$scope.component = new Mod_Component();
	$scope.settings = [];
	$scope.settings[0] = 23;
	$scope.settings[1] = 0;
	$scope.settings[2] = {};
	$scope.settings[2].start = 0;
	$scope.settings[2].end = 0;
	$scope.settings[2].times = [];
	
	$scope.component.setSettings($scope.settings);
	
	$scope.addRoom = function() {
		$state.go("houseconfiguration.rooms.addRoom");
    };
	                                      
	$scope.showRoom = function($roomId) {
		
		$state.go("rooms.detail", {'roomId':$roomId});
	};
   
	$scope.configureHeatingAutopilot = function()
	{
		$state.go("rooms.detail.heatingAutopilot",{componentId:2});
	}
	
	$scope.nextRoom = function($event) {
		var element = $event.toElement || $event.srcElement;
		if(shouldSwipe(element)) {
			if ($rootScope.houses[$rootScope.houseIndex].getRoomById(parseInt($scope.roomId) + 1)) {
				$state.go("rooms.detail", {'roomId': (parseInt($scope.roomId) + 1)});
			} else {
				$state.go("rooms.detail", {'roomId': $rootScope.houses[$rootScope.houseIndex].getRooms()[0].getId()});
			}
		}
	};
	
	$scope.prevRoom = function($event) {
		var element = $event.toElement || $event.srcElement;
		if(shouldSwipe(element)) {
			if ($rootScope.houses[$rootScope.houseIndex].getRoomById(parseInt($scope.roomId) - 1)) {
				$state.go("rooms.detail", {'roomId': (parseInt($scope.roomId) - 1)});
			} else {
				var rooms = $rootScope.houses[$rootScope.houseIndex].getRooms();
				$state.go("rooms.detail", {'roomId': rooms[rooms.length - 1].getId()});
			}
		}
	};
	
	$scope.heatingMode=1;
}]);