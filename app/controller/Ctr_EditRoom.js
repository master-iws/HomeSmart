'use strict';

app.controller('EditRoomController',["$scope", "$rootScope", "$state", "$stateParams",
                                      function($scope, $rootScope, $state, $stateParams) {
	
	$scope.roomId = $stateParams.roomId;
	$scope.room = $rootScope.houses[$rootScope.houseIndex].getRoomById($scope.roomId);
	
	$scope.save = function() {
		
		 $rootScope.houses[$rootScope.houseIdx].floors[$stateParams.floorId] = $scope.room;
		 $state.go("houseconfiguration.rooms");
    };
    
    $scope.cancel = function() {
		
    	 $scope.room = $rootScope.houses[$rootScope.houseIdx].floors[$stateParams.floorId].name;
   };
   
}]);