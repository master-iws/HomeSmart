'use strict';

app.controller('EditQuicklinkController',["$scope", "$rootScope", "$state", "$stateParams",
                                      function($scope, $rootScope, $state, $stateParams) {
	
	$scope.types = [];
	$scope.categories = ['Kategorie', 'Etage', 'Raum'];
	$scope.quicklink = $rootScope.dashboard.quicklinks[$stateParams.quicklinkId];//auf rootScope setzen
	
	$scope.save = function() {
		
		 $rootScope.houses[$rootScope.houseIdx].dashboard.quicklinks[$stateParams.quicklinkId] = $scope.quicklink;
    };
    
    $scope.cancel = function() {
		$state.go("houseconfiguration.dashboard");
   };
   
   $scope.categoryChanged = function()
   {
	   if($scope.quicklink.category == 'Kategorie')
		   $scope.types = $rootScope.categories;
	   else if($scope.quicklink.category == 'Etage')
		   $scope.types = $rootScope.houses[$rootScope.houseIdx].floors;
	   else
		   $scope.types = $scope.getRooms();
   }
   
   $scope.getRooms = function()
   {
	   $rooms = [];
	   
	   for($floor in $rootScope.houses[$rootScope.houseIdx].floors)
		   $rooms.push($floor.rooms);
	   
	   return $rooms;
   }
   
}]);