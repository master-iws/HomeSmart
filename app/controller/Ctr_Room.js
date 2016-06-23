'use strict';

app.controller('RoomController',["$scope", "$rootScope", "$state", "$stateParams",
                                      function($scope, $rootScope, $state, $stateParams) {

	$scope.roomId = $stateParams.roomId;
	                                      
	$scope.addRoom = function() {
		$state.go("houseconfiguration.rooms.addRoom");
    };
	                                      
	$scope.showRoom = function($roomIdx) {
		$state.go("rooms.detail", {'roomId':$roomIdx});
	};
   
}]);