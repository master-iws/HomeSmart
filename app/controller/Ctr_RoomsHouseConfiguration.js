'use strict';

app.controller('RoomsHouseConfigurationController',["$scope", "$rootScope", "$state",	function($scope, $rootScope, $state) {
	
	console.log();
	$scope.deleteRoom = function($floorIdx) {
		
		var modalInstance = $uibModal.open({
		      animation: $scope.animationsEnabled,
		      templateUrl: 'app/views/dialog/deleteRoomDialog.htm',
		      controller: 'DeleteRoomController',
		      size: size,
		      resolve: {
		        items: function () {
		          return $scope.items;
		        }
		      }
		    });
    };
    
    $scope.addRoom = function() {
    	$state.go("houseconfiguration.rooms.addRoom");
    };
    
    $scope.editRoom = function($roomIdx) {
    	$state.go("houseconfiguration.rooms.editRoom",{'roomId':$floorIdx});
    };
}]);