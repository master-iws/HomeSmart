'use strict';

app.controller('RoomController',["$scope", "$rootScope", "$state", "$stateParams",
                                      function($scope, $rootScope, $state, $stateParams) {

	$scope.roomId = $stateParams.roomId;
	$scope.selectedRoom = $rootScope.houses[$rootScope.houseIndex].getRoomById($scope.roomId);
	
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
		$state.go("rooms.detail.heatingAutopilot");
	}
	
	
	//heizungssacchen
	$scope.heatingMode=1;
}]);