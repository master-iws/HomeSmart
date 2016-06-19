'use strict';

app.controller('AddRoomController',["$scope", "$rootScope", "$state", "$stateParams",
                                      function($scope, $rootScope, $state, $stateParams) {
	$scope.room = {};

	$scope.save = function() {
		
		 $rootScope.houses[$rootScope.houseIdx].floors[$stateParams.floorId].push($scope.room);
		 $state.go("houseconfiguration.rooms");
    };
    
    $scope.cancel = function() {
		
    	 $state.go("houseconfiguration.rooms");
   };
   
}]);