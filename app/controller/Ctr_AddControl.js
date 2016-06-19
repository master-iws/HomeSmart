'use strict';

app.controller('AddQuicklinkController',["$scope", "$rootScope", "$state", "$stateParams",
                                      function($scope, $rootScope, $state, $stateParams) {
	
	$scope.types = [];
	$scope.rooms = $scope.getRooms();
	$scope.quicklink = {room:'',component:''};//auf rootScope setzen
	
	$scope.save = function() {
		
		 $rootScope.houses[$rootScope.houseIdx].dashboard.controls.push($scope.quicklink);
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