'use strict';

app.controller('EditControlController',["$scope", "$rootScope", "$state", "$stateParams",
                                      function($scope, $rootScope, $state, $stateParams) {
	
	$scope.types = [];
	$scope.rooms = $scope.getRooms();
	$scope.control = $rootScope.dashboard.quicklinks[$stateParams.controlId];//auf rootScope setzen
	
	$scope.save = function() {
		
		 $rootScope.houses[$rootScope.houseIdx].dashboard.controls[$stateParams.quicklinkId] = $scope.control;
    };
    
    $scope.cancel = function() {
		$state.go("houseconfiguration.dashboard");
   };
   
   $scope.getRooms = function()
   {
	   $rooms = [];
	   
	   for($floor in $rootScope.houses[$rootScope.houseIdx].floors)
		   $rooms.push($floor.rooms);
	   
	   return $rooms;
   }
   
}]);